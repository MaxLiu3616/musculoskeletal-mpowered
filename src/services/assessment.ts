import { supabase } from '@/services/supabase';

import type {
  AssessmentRecord,
  AssessmentRecordDraft,
} from '@/features/my-health/MyHealth.types';

import type {
  HomeAssessmentId,
} from '@/features/home/components/HomeScreen.data';

type AssessmentCycleRow = {
  id: string;
  user_id: string;
  cycle_start: string;
  created_at: string;
};

type AssessmentSummaryData = {
  sections: AssessmentRecordDraft['sections'];
  periodLabel?: string;
  pain?: AssessmentRecordDraft['pain'];
};

type AssessmentSummaryRow = {
  id: string;
  user_id: string;
  cycle_id: string;
  assessment_type: HomeAssessmentId;
  summary_data: AssessmentSummaryData;
  average_pain: number | null;
  worst_pain: number | null;
  mildest_pain: number | null;
  created_at: string;
  updated_at: string;
};

const getCurrentUserId = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error(
      'No authenticated user.',
    );
  }

  return user.id;
};

const sortJsonValue = (
  value: unknown,
): unknown => {
  if (Array.isArray(value)) {
    return value.map(
      sortJsonValue,
    );
  }

  if (
    value !== null &&
    typeof value === 'object'
  ) {
    return Object.keys(value)
      .sort()
      .reduce<
        Record<string, unknown>
      >(
        (result, key) => {
          result[key] =
            sortJsonValue(
              (
                value as Record<
                  string,
                  unknown
                >
              )[key],
            );

          return result;
        },
        {},
      );
  }

  return value;
};

const jsonValuesEqual = (
  first: unknown,
  second: unknown,
) =>
  JSON.stringify(
    sortJsonValue(first),
  ) ===
  JSON.stringify(
    sortJsonValue(second),
  );

const getOrCreateAssessmentCycle =
  async (
    userId: string,
    cycleStart: string,
  ) => {
    const {
      data: existingCycle,
      error: selectError,
    } = await supabase
      .from('assessment_cycles')
      .select(
        'id, user_id, cycle_start, created_at',
      )
      .eq('user_id', userId)
      .eq(
        'cycle_start',
        cycleStart,
      )
      .maybeSingle();

    if (selectError) {
      throw selectError;
    }

    if (existingCycle) {
      return (
        existingCycle as AssessmentCycleRow
      );
    }

    const {
      data: newCycle,
      error: insertError,
    } = await supabase
      .from('assessment_cycles')
      .insert({
        user_id: userId,
        cycle_start: cycleStart,
      })
      .select(
        'id, user_id, cycle_start, created_at',
      )
      .single();

    if (insertError) {
      throw insertError;
    }

    return (
      newCycle as AssessmentCycleRow
    );
  };

export const saveAssessmentSummary =
  async (
    draft: AssessmentRecordDraft,
    cycleStart: string,
  ) => {
    const userId =
      await getCurrentUserId();

    const cycle =
      await getOrCreateAssessmentCycle(
        userId,
        cycleStart,
      );

    const summaryData:
      AssessmentSummaryData = {
      sections: draft.sections,
      periodLabel:
        draft.periodLabel,
      pain: draft.pain,
    };

    const averagePain =
      draft.type === 'pain'
        ? draft.pain
            ?.averagePain ?? null
        : null;

    const worstPain =
      draft.type === 'pain'
        ? draft.pain
            ?.worstPain ?? null
        : null;

    const mildestPain =
      draft.type === 'pain'
        ? draft.pain
            ?.mildestPain ?? null
        : null;

    const {
      data: existingSummary,
      error: existingError,
    } = await supabase
      .from(
        'assessment_summaries',
      )
      .select('*')
      .eq(
        'cycle_id',
        cycle.id,
      )
      .eq(
        'assessment_type',
        draft.type,
      )
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    if (existingSummary) {
      const existing =
        existingSummary as AssessmentSummaryRow;

      const hasSameContent =
        jsonValuesEqual(
          existing.summary_data,
          summaryData,
        ) &&
        existing.average_pain ===
          averagePain &&
        existing.worst_pain ===
          worstPain &&
        existing.mildest_pain ===
          mildestPain;

      if (hasSameContent) {
        return existing;
      }

      const {
        data: updatedSummary,
        error: updateError,
      } = await supabase
        .from(
          'assessment_summaries',
        )
        .update({
          summary_data:
            summaryData,
          average_pain:
            averagePain,
          worst_pain:
            worstPain,
          mildest_pain:
            mildestPain,
        })
        .eq(
          'id',
          existing.id,
        )
        .select('*')
        .single();

      if (updateError) {
        throw updateError;
      }

      return (
        updatedSummary as AssessmentSummaryRow
      );
    }

    const {
      data: newSummary,
      error: insertError,
    } = await supabase
      .from(
        'assessment_summaries',
      )
      .insert({
        user_id: userId,
        cycle_id: cycle.id,
        assessment_type:
          draft.type,
        summary_data:
          summaryData,
        average_pain:
          averagePain,
        worst_pain:
          worstPain,
        mildest_pain:
          mildestPain,
      })
      .select('*')
      .single();

    if (insertError) {
      throw insertError;
    }

    return (
      newSummary as AssessmentSummaryRow
    );
  };

export const loadAssessmentRecords =
  async (): Promise<
    AssessmentRecord[]
  > => {
    const userId =
      await getCurrentUserId();

    const {
      data: cycles,
      error: cycleError,
    } = await supabase
      .from('assessment_cycles')
      .select(
        'id, user_id, cycle_start, created_at',
      )
      .eq('user_id', userId);

    if (cycleError) {
      throw cycleError;
    }

    if (!cycles?.length) {
      return [];
    }

    const cycleRows =
      cycles as AssessmentCycleRow[];

    const cycleStartById =
      new Map(
        cycleRows.map(
          (cycle) => [
            cycle.id,
            cycle.cycle_start,
          ],
        ),
      );

    const cycleIds =
      cycleRows.map(
        (cycle) =>
          cycle.id,
      );

    const {
      data: summaries,
      error: summaryError,
    } = await supabase
      .from(
        'assessment_summaries',
      )
      .select('*')
      .eq(
        'user_id',
        userId,
      )
      .in(
        'cycle_id',
        cycleIds,
      )
      .order(
        'updated_at',
        {
          ascending: false,
        },
      );

    if (summaryError) {
      throw summaryError;
    }

    return (
      (
        summaries ?? []
      ) as AssessmentSummaryRow[]
    ).flatMap(
      (summary) => {
        const cycleStart =
          cycleStartById.get(
            summary.cycle_id,
          );

        if (!cycleStart) {
          return [];
        }

        const summaryData =
          summary.summary_data ?? {
            sections: [],
          };

        return [
          {
            id:
              `${cycleStart}:${summary.assessment_type}`,

            type:
              summary.assessment_type,

            sections:
              summaryData.sections ??
              [],

            periodLabel:
              summaryData.periodLabel,

            pain:
              summaryData.pain,

            weekStart:
              cycleStart,

            completedAt:
              summary.updated_at,
          },
        ];
      },
    );
  };
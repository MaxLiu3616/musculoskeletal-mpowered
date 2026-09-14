import type { AssessmentRecord } from '@/features/my-health/MyHealth.types';

export type PainTrendPoint = {
  date: string;
  averagePain: number;
};

export type PainInsight = {
  message: string;
  painTrend: PainTrendPoint[];
};

export const insightCardCopy = {
  heading:
    'New insights for your MPowered plan.',

  checkPainHistoryLabel:
    'Check pain history',

  planAppointmentLabel:
    'Plan Appointment with doctors',

  checkPainGuideLabel:
    'Check Pain Guide',

  dismissAccessibilityLabel:
    'Dismiss insight',
} as const;

const INSIGHT_WINDOW_DAYS = 28;

const MIN_PAIN_RECORDS_FOR_INSIGHT = 4;

const MILLISECONDS_PER_DAY =
  24 * 60 * 60 * 1000;

function formatTrendDate(
  weekStart: string,
) {
  const date = new Date(
    `${weekStart}T12:00:00`,
  );

  return date.toLocaleDateString(
    'en-AU',
    {
      day: '2-digit',
      month: '2-digit',
    },
  );
}

export function buildPainInsight(
  records: AssessmentRecord[],
): PainInsight | null {
  const painRecords = records
    .flatMap((record) => {
      if (
        record.type !== 'pain' ||
        !record.pain
      ) {
        return [];
      }

      const averagePain =
        record.pain.averagePain;

      if (
        typeof averagePain !==
          'number' ||
        !Number.isFinite(averagePain)
      ) {
        return [];
      }

      return [
        {
          record,
          averagePain,
        },
      ];
    })
    .sort(
      (a, b) =>
        new Date(
          `${a.record.weekStart}T12:00:00`,
        ).getTime() -
        new Date(
          `${b.record.weekStart}T12:00:00`,
        ).getTime(),
    );

  if (
    painRecords.length <
    MIN_PAIN_RECORDS_FOR_INSIGHT
  ) {
    return null;
  }

  const latestRecord =
    painRecords[
      painRecords.length - 1
    ];

  const latestDate = new Date(
    `${latestRecord.record.weekStart}T12:00:00`,
  ).getTime();

  const windowStart =
    latestDate -
    (INSIGHT_WINDOW_DAYS - 1) *
      MILLISECONDS_PER_DAY;

  const recentPainRecords =
    painRecords.filter(
      ({ record }) => {
        const recordDate =
          new Date(
            `${record.weekStart}T12:00:00`,
          ).getTime();

        return (
          recordDate >= windowStart &&
          recordDate <= latestDate
        );
      },
    );

  if (
    recentPainRecords.length <
    MIN_PAIN_RECORDS_FOR_INSIGHT
  ) {
    return null;
  }

  const painTrend: PainTrendPoint[] =
    recentPainRecords.map(
      ({
        record,
        averagePain,
      }) => ({
        date: formatTrendDate(
          record.weekStart,
        ),

        averagePain,
      }),
    );

  const firstPain =
    painTrend[0].averagePain;

  const latestPain =
    painTrend[
      painTrend.length - 1
    ].averagePain;

  let message =
    'Your average pain remained stable';

  if (latestPain > firstPain) {
    message =
      'Your average pain increased';
  }

  if (latestPain < firstPain) {
    message =
      'Your average pain decreased';
  }

  return {
    message,
    painTrend,
  };
}
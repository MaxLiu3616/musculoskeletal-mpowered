import type {
  AppointmentAnswer,
  AppointmentPlan,
  AppointmentQuestion,
  SupportPerson,
} from '@/features/care-planner/CarePlanner.types';

import { supabase } from './supabase';

type AppointmentConsent = {
  paths: string[];
  signedAt: string;
};

type AppointmentPlanRow = {
  id: string;
  user_id: string;
  appointment_date: string | null;
  doctor_name: string | null;
  service: string | null;
  support_people: SupportPerson[];
  questions: AppointmentQuestion[];
  consent: AppointmentConsent | null;
  answers: Record<string, AppointmentAnswer>;
  selected_question_ids: string[];
  generated_at: string | null;
  has_assessments: boolean;
  created_at: string;
  updated_at: string;
};

async function getCurrentUserId() {
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
}

function mapAppointmentPlan(
  row: AppointmentPlanRow,
): AppointmentPlan {
  return {
    id: row.id,

    appointmentDate:
      row.appointment_date ?? '',

    doctorName:
      row.doctor_name ?? '',

    service:
      row.service ?? 'Not specified',

    supportPeople:
      row.support_people ?? [],

    questions:
      row.questions ?? [],

    selectedIds:
      row.selected_question_ids ?? [],

    generatedAt:
      row.generated_at ??
      row.created_at,

    hasAssessments:
      row.has_assessments,

    consent:
      row.consent ?? null,

    answers:
      row.answers ?? {},
  };
}

function toDatabasePayload(
  plan: AppointmentPlan,
) {
  return {
    appointment_date:
      plan.appointmentDate || null,

    doctor_name:
      plan.doctorName.trim() ||
      null,

    service:
      plan.service.trim() ||
      null,

    support_people:
      plan.supportPeople,

    questions:
      plan.questions,

    selected_question_ids:
      plan.selectedIds,

    generated_at:
      plan.generatedAt ||
      null,

    has_assessments:
      plan.hasAssessments,

    consent:
      plan.consent,

    answers:
      plan.answers,
  };
}

export async function loadAppointmentPlans():
  Promise<AppointmentPlan[]> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('appointment_plans')
    .select('*')
    .eq(
      'user_id',
      userId,
    )
    .order(
      'appointment_date',
      {
        ascending: true,
        nullsFirst: false,
      },
    );

  if (error) {
    throw error;
  }

  return (
    (data ?? []) as AppointmentPlanRow[]
  ).map(
    mapAppointmentPlan,
  );
}

export async function createAppointmentPlan(
  plan: AppointmentPlan,
): Promise<AppointmentPlan> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('appointment_plans')
    .insert({
      user_id: userId,

      ...toDatabasePayload(
        plan,
      ),
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapAppointmentPlan(
    data as AppointmentPlanRow,
  );
}

export async function updateAppointmentPlan(
  id: string,
  plan: AppointmentPlan,
): Promise<AppointmentPlan> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('appointment_plans')
    .update(
      toDatabasePayload(
        plan,
      ),
    )
    .eq(
      'id',
      id,
    )
    .eq(
      'user_id',
      userId,
    )
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapAppointmentPlan(
    data as AppointmentPlanRow,
  );
}

export async function deleteAppointmentPlan(
  id: string,
) {
  const userId =
    await getCurrentUserId();

  const { error } =
    await supabase
      .from('appointment_plans')
      .delete()
      .eq(
        'id',
        id,
      )
      .eq(
        'user_id',
        userId,
      );

  if (error) {
    throw error;
  }
}
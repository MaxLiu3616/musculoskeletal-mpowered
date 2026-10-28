import { supabase } from './supabase';
import { getSupportPersonError } from '@/features/setting/SupportPeople.data';

export type SupportPerson = {
  id: string;
  name: string;
  phone: string;
  email: string;
  canAddQuestions: boolean;
  canViewAnswers: boolean;
};

export type SupportPersonInput =
  Omit<SupportPerson, 'id'>;

type SupportPersonRow = {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  can_add_questions: boolean;
  can_view_answers: boolean;
  created_at: string;
  updated_at: string;
};

async function getCurrentUserId(expectedUserId: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user || user.id !== expectedUserId) {
    throw new Error(
      'Your account has changed. Sign in again before saving support people.',
    );
  }

  return user.id;
}

function mapSupportPerson(
  row: SupportPersonRow,
): SupportPerson {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone ?? '',
    email: row.email ?? '',
    canAddQuestions:
      row.can_add_questions,
    canViewAnswers:
      row.can_view_answers,
  };
}

function toDatabasePayload(
  input: SupportPersonInput,
) {
  const error = getSupportPersonError(input);
  if (error) throw new Error(error);

  return {
    name: input.name.trim(),

    phone:
      input.phone.trim() ||
      null,

    email:
      input.email.trim() ||
      null,

    can_add_questions:
      input.canAddQuestions,

    can_view_answers:
      input.canViewAnswers,
  };
}

export async function loadSupportPeople(expectedUserId: string):
  Promise<SupportPerson[]> {
  const userId =
    await getCurrentUserId(expectedUserId);

  const {
    data,
    error,
  } = await supabase
    .from('support_people')
    .select('*')
    .eq(
      'user_id',
      userId,
    )
    .order(
      'created_at',
      {
        ascending: true,
      },
    );

  if (error) {
    throw error;
  }

  return (
    (data ?? []) as SupportPersonRow[]
  ).map(
    mapSupportPerson,
  );
}

export async function createSupportPerson(
  input: SupportPersonInput,
  expectedUserId: string,
): Promise<SupportPerson> {
  const payload = toDatabasePayload(input);
  const userId =
    await getCurrentUserId(expectedUserId);

  const {
    data,
    error,
  } = await supabase
    .from('support_people')
    .insert({
      user_id: userId,

      ...payload,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapSupportPerson(
    data as SupportPersonRow,
  );
}

export async function updateSupportPerson(
  id: string,
  input: SupportPersonInput,
  expectedUserId: string,
): Promise<SupportPerson> {
  const payload = toDatabasePayload(input);
  const userId =
    await getCurrentUserId(expectedUserId);

  const {
    data,
    error,
  } = await supabase
    .from('support_people')
    .update(
      payload,
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

  return mapSupportPerson(
    data as SupportPersonRow,
  );
}

export async function deleteSupportPerson(
  id: string,
  expectedUserId: string,
) {
  const userId =
    await getCurrentUserId(expectedUserId);

  const { error } =
    await supabase
      .from('support_people')
      .delete()
      .eq(
        'id',
        id,
      )
      .eq(
        'user_id',
        userId,
      )
      .select('id')
      .single();

  if (error) {
    throw error;
  }
}

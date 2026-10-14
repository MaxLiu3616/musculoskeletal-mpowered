import { supabase } from './supabase';

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

export async function loadSupportPeople():
  Promise<SupportPerson[]> {
  const userId =
    await getCurrentUserId();

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
): Promise<SupportPerson> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('support_people')
    .insert({
      user_id: userId,

      ...toDatabasePayload(
        input,
      ),
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
): Promise<SupportPerson> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('support_people')
    .update(
      toDatabasePayload(
        input,
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

  return mapSupportPerson(
    data as SupportPersonRow,
  );
}

export async function deleteSupportPerson(
  id: string,
) {
  const userId =
    await getCurrentUserId();

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
      );

  if (error) {
    throw error;
  }
}
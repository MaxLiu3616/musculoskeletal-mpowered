import { supabase } from './supabase';

type ReflectionNoteRow = {
  user_id: string;
  notes: string;
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

export async function loadReflectionNotes():
  Promise<string> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('reflection_notes')
    .select('*')
    .eq(
      'user_id',
      userId,
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return '';
  }

  return (
    data as ReflectionNoteRow
  ).notes;
}

export async function saveReflectionNotes(
  notes: string,
) {
  const userId =
    await getCurrentUserId();

  const { error } =
    await supabase
      .from('reflection_notes')
      .upsert(
        {
          user_id: userId,
          notes,
        },
        {
          onConflict: 'user_id',
        },
      );

  if (error) {
    throw error;
  }
}
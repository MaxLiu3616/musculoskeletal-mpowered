import { supabase } from './supabase';

export type UserSettings = {
  weeklyReminders: boolean;
  appointmentReminders: boolean;
  textSize:
    | 'small'
    | 'medium'
    | 'large';
};

export const defaultUserSettings:
  UserSettings = {
  weeklyReminders: true,
  appointmentReminders: true,
  textSize: 'medium',
};

type UserSettingsRow = {
  user_id: string;
  weekly_reminders: boolean;
  appointment_reminders: boolean;
  text_size:
    | 'small'
    | 'medium'
    | 'large';
  created_at: string;
  updated_at: string;
};

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } =
    await supabase.auth.getUser();

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

function mapSettings(
  row: UserSettingsRow,
): UserSettings {
  return {
    weeklyReminders:
      row.weekly_reminders,

    appointmentReminders:
      row.appointment_reminders,

    textSize:
      row.text_size,
  };
}

export async function loadUserSettings():
  Promise<UserSettings> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('user_settings')
    .select('*')
    .eq(
      'user_id',
      userId,
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data) {
    return mapSettings(
      data as UserSettingsRow,
    );
  }

  const {
    data: created,
    error: createError,
  } = await supabase
    .from('user_settings')
    .insert({
      user_id: userId,

      weekly_reminders:
        defaultUserSettings.weeklyReminders,

      appointment_reminders:
        defaultUserSettings.appointmentReminders,

      text_size:
        defaultUserSettings.textSize,
    })
    .select('*')
    .single();

  if (createError) {
    throw createError;
  }

  return mapSettings(
    created as UserSettingsRow,
  );
}

export async function updateUserSettings(
  changes: Partial<UserSettings>,
) {
  const userId =
    await getCurrentUserId();

  const payload: {
    user_id: string;
    weekly_reminders?: boolean;
    appointment_reminders?: boolean;
    text_size?:
      UserSettings['textSize'];
  } = {
    user_id: userId,
  };

  if (
    changes.weeklyReminders !==
    undefined
  ) {
    payload.weekly_reminders =
      changes.weeklyReminders;
  }

  if (
    changes.appointmentReminders !==
    undefined
  ) {
    payload.appointment_reminders =
      changes.appointmentReminders;
  }

  if (
    changes.textSize !==
    undefined
  ) {
    payload.text_size =
      changes.textSize;
  }

  const { error } =
    await supabase
      .from('user_settings')
      .upsert(
        payload,
        {
          onConflict: 'user_id',
        },
      );

  if (error) {
    throw error;
  }
}
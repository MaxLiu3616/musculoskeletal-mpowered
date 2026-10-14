import type {
  Prescription,
  PrescriptionInput,
} from '@/features/my-health/MyHealth.types';

import { supabase } from './supabase';

type PrescriptionRow = {
  id: string;
  user_id: string;
  name: string;
  strength: number;
  strength_unit: string;
  form: string;
  dosage: number;
  repeat_every: number;
  time_unit: string;
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

function mapPrescription(
  row: PrescriptionRow,
): Prescription {
  return {
    id: row.id,

    name: row.name,

    strength:
      String(row.strength),

    strengthUnit:
      row.strength_unit,

    form: row.form,

    dosage:
      String(row.dosage),

    repeatEvery:
      String(row.repeat_every),

    timeUnit:
      row.time_unit,
  } as Prescription;
}

function toDatabasePayload(
  input: PrescriptionInput,
) {
  return {
    name:
      input.name.trim(),

    strength:
      Number(
        input.strength,
      ),

    strength_unit:
      input.strengthUnit,

    form:
      input.form,

    dosage:
      Number(
        input.dosage,
      ),

    repeat_every:
      Number(
        input.repeatEvery,
      ),

    time_unit:
      input.timeUnit,
  };
}

export async function loadPrescriptions():
  Promise<Prescription[]> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('prescriptions')
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
    (data ?? []) as PrescriptionRow[]
  ).map(
    mapPrescription,
  );
}

export async function createPrescription(
  input: PrescriptionInput,
): Promise<Prescription> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('prescriptions')
    .insert({
      user_id:
        userId,

      ...toDatabasePayload(
        input,
      ),
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapPrescription(
    data as PrescriptionRow,
  );
}

export async function updatePrescription(
  id: string,
  input: PrescriptionInput,
): Promise<Prescription> {
  const userId =
    await getCurrentUserId();

  const {
    data,
    error,
  } = await supabase
    .from('prescriptions')
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

  return mapPrescription(
    data as PrescriptionRow,
  );
}

export async function deletePrescription(
  id: string,
) {
  const userId =
    await getCurrentUserId();

  const { error } =
    await supabase
      .from('prescriptions')
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
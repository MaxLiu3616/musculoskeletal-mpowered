import { supabase } from '@/services/supabase';

import type {
  HealthProfileDetails,
} from '@/features/onboarding/OnboardingContext';

import type {
  ConditionOptionId,
  DiagnosisOptionId,
} from '@/features/onboarding/components/HealthConditionsScreen.data';

import type {
  SexOptionId,
} from '@/features/onboarding/components/SexScreen.data';

export type UserProfileRow = {
  user_id: string;
  name: string | null;
  sex: SexOptionId | null;
  year_of_birth: number | null;
  diagnosis: DiagnosisOptionId | null;
  conditions: ConditionOptionId[];
  other_conditions: string | null;
  created_at: string;
  updated_at: string;
};

type CreateUserProfileInput = {
  name: string;
  profile: HealthProfileDetails;
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
    throw new Error('No authenticated user.');
  }

  return user.id;
};

export const userProfileExists =
  async () => {
    const userId =
      await getCurrentUserId();

    const {
      data,
      error,
    } = await supabase
      .from('user_profiles')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data !== null;
  };

export const getUserProfile =
  async () => {
    const userId =
      await getCurrentUserId();

    const {
      data,
      error,
    } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as UserProfileRow | null;
  };

export const createUserProfile =
  async ({
    name,
    profile,
  }: CreateUserProfileInput) => {
    const userId =
      await getCurrentUserId();

    const yearOfBirth =
      profile.yearOfBirth.trim()
        ? Number(
            profile.yearOfBirth,
          )
        : null;

    const {
      data,
      error,
    } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        name:
          name.trim() || null,
        sex: profile.sex,
        year_of_birth:
          yearOfBirth,
        diagnosis:
          profile.diagnosis,
        conditions:
          profile.conditions,
        other_conditions:
          profile.otherConditions.trim() ||
          null,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as UserProfileRow;
  };

export const updateUserProfile =
  async ({
    name,
    profile,
  }: CreateUserProfileInput) => {
    const userId =
      await getCurrentUserId();

    const yearOfBirth =
      profile.yearOfBirth.trim()
        ? Number(
            profile.yearOfBirth,
          )
        : null;

    const {
      data,
      error,
    } = await supabase
      .from('user_profiles')
      .update({
        name:
          name.trim() || null,
        sex: profile.sex,
        year_of_birth:
          yearOfBirth,
        diagnosis:
          profile.diagnosis,
        conditions:
          profile.conditions,
        other_conditions:
          profile.otherConditions.trim() ||
          null,
      })
      .eq('user_id', userId)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as UserProfileRow;
  };
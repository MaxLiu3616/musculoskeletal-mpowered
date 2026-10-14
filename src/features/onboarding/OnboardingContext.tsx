import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  ConditionOptionId,
  DiagnosisOptionId,
} from './components/HealthConditionsScreen.data';

import type {
  SexOptionId,
} from './components/SexScreen.data';

export type AuthMode =
  | 'signup'
  | 'signin'
  | null;

export type HealthProfileDetails = {
  sex: SexOptionId | null;
  yearOfBirth: string;
  diagnosis: DiagnosisOptionId | null;
  conditions: ConditionOptionId[];
  otherConditions: string;
};

type OnboardingContextValue = {
  name: string;
  setName: (name: string) => void;

  phoneNumber: string;
  setPhoneNumber: (
    phoneNumber: string,
  ) => void;

  authMode: AuthMode;
  setAuthMode: (
    mode: AuthMode,
  ) => void;

  profile: HealthProfileDetails;

  updateProfile: (
    details: Partial<HealthProfileDetails>,
  ) => void;

  reset: () => void;
};

const OnboardingContext =
  createContext<OnboardingContextValue | null>(
    null,
  );

type OnboardingProviderProps = {
  children: ReactNode;
};

const createInitialProfile =
  (): HealthProfileDetails => ({
    sex: null,
    yearOfBirth: '',
    diagnosis: null,
    conditions: [],
    otherConditions: '',
  });

export function OnboardingProvider({
  children,
}: OnboardingProviderProps) {
  const [
    name,
    setName,
  ] = useState('');

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState('');

  const [
    authMode,
    setAuthMode,
  ] = useState<AuthMode>(null);

  const [
    profile,
    setProfile,
  ] = useState<HealthProfileDetails>(
    createInitialProfile,
  );

  const updateProfile = useCallback(
    (
      details:
        Partial<HealthProfileDetails>,
    ) => {
      setProfile((current) => ({
        ...current,
        ...details,
      }));
    },
    [],
  );

  const reset = useCallback(() => {
    setName('');
    setPhoneNumber('');
    setAuthMode(null);
    setProfile(createInitialProfile());
  }, []);

  const value = useMemo(
    () => ({
      name,
      setName,
      phoneNumber,
      setPhoneNumber,
      authMode,
      setAuthMode,
      profile,
      updateProfile,
      reset,
    }),
    [
      name,
      phoneNumber,
      authMode,
      profile,
      updateProfile,
      reset,
    ],
  );

  return (
    <OnboardingContext.Provider
      value={value}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context =
    useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      'useOnboarding must be used inside OnboardingProvider',
    );
  }

  return context;
}
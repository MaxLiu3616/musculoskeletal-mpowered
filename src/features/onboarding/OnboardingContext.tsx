import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type { ConditionOptionId, DiagnosisOptionId } from './components/HealthConditionsScreen.data';
import type { SexOptionId } from './components/SexScreen.data';

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
  profile: HealthProfileDetails;
  updateProfile: (details: Partial<HealthProfileDetails>) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

type OnboardingProviderProps = {
  children: ReactNode;
};

const initialProfile: HealthProfileDetails = {
  sex: null, yearOfBirth: '', diagnosis: null, conditions: [], otherConditions: '',
};

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [name, setName] = useState('');
  const [profile, setProfile] = useState<HealthProfileDetails>(initialProfile);
  const updateProfile = (details: Partial<HealthProfileDetails>) => {
    setProfile((current) => ({ ...current, ...details }));
  };
  const reset = () => {
    setName('');
    setProfile(initialProfile);
  };

  return (
    <OnboardingContext.Provider value={{ name, setName, profile, updateProfile, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }

  return context;
}

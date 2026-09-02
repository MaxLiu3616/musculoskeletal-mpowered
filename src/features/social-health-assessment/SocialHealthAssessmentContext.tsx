import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  GeneralMoodId,
  SocialHealthAssessmentResponses,
  SocialHealthImpactArea,
  SocialHealthImpactScore,
  SocialHealthStatementScore,
} from '@/features/social-health-assessment/types/SocialHealthAssessment';

const initialResponses: SocialHealthAssessmentResponses = {
  socialLife: null,
  travelling: null,
  moodImpact: null,
  relationshipImpact: null,
  enjoymentImpact: null,
  generalMood: null,
  reflection: '',
};

type SocialHealthAssessmentContextValue = {
  responses: SocialHealthAssessmentResponses;

  updateSocialLife: (
    value: SocialHealthStatementScore,
  ) => void;

  updateTravelling: (
    value: SocialHealthStatementScore,
  ) => void;

  updateImpact: (
    area: SocialHealthImpactArea,
    value: SocialHealthImpactScore,
  ) => void;

  updateGeneralMood: (
    value: GeneralMoodId,
  ) => void;

  updateReflection: (
    value: string,
  ) => void;
};

const SocialHealthAssessmentContext =
  createContext<SocialHealthAssessmentContextValue | null>(
    null,
  );

type SocialHealthAssessmentProviderProps = {
  children: ReactNode;
};

export function SocialHealthAssessmentProvider({
  children,
}: SocialHealthAssessmentProviderProps) {
  const [responses, setResponses] =
    useState<SocialHealthAssessmentResponses>(
      initialResponses,
    );

  const updateSocialLife = (
    value: SocialHealthStatementScore,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      socialLife: value,
    }));
  };

  const updateTravelling = (
    value: SocialHealthStatementScore,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      travelling: value,
    }));
  };

  const updateImpact = (
    area: SocialHealthImpactArea,
    value: SocialHealthImpactScore,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [area]: value,
    }));
  };

  const updateGeneralMood = (
    value: GeneralMoodId,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      generalMood: value,
    }));
  };

  const updateReflection = (
    value: string,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      reflection: value,
    }));
  };

  return (
    <SocialHealthAssessmentContext.Provider
      value={{
        responses,
        updateSocialLife,
        updateTravelling,
        updateImpact,
        updateGeneralMood,
        updateReflection,
      }}
    >
      {children}
    </SocialHealthAssessmentContext.Provider>
  );
}

export function useSocialHealthAssessment() {
  const context =
    useContext(SocialHealthAssessmentContext);

  if (!context) {
    throw new Error(
      'useSocialHealthAssessment must be used inside SocialHealthAssessmentProvider',
    );
  }

  return context;
}
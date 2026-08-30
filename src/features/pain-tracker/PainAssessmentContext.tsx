import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  PainAssessmentResponses,
  PainCharacteristicId,
  PainIntensityResponseKey,
  PainLocationId,
} from '@/features/pain-tracker/types/PainAssessment';

const initialResponses: PainAssessmentResponses = {
  locations: [],
  otherLocation: '',
  characteristics: [],
  currentPain: null,
  mildestPain: null,
  worstPain: null,
  averagePain: null,
};

type PainAssessmentContextValue = {
  responses: PainAssessmentResponses;
  isComplete: boolean;
  updateLocations: (
    locations: PainLocationId[],
    otherLocation: string,
  ) => void;
  updateCharacteristics: (
    characteristics: PainCharacteristicId[],
  ) => void;
  updateIntensity: (
    responseKey: PainIntensityResponseKey,
    value: number,
  ) => void;
  markComplete: () => void;
};

const PainAssessmentContext = createContext<
  PainAssessmentContextValue | null
>(null);

type PainAssessmentProviderProps = {
  children: ReactNode;
};

export function PainAssessmentProvider({
  children,
}: PainAssessmentProviderProps) {
  const [responses, setResponses] = useState(initialResponses);
  const [isComplete, setIsComplete] = useState(false);

  const updateLocations = (
    locations: PainLocationId[],
    otherLocation: string,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      locations,
      otherLocation,
    }));
  };

  const updateCharacteristics = (
    characteristics: PainCharacteristicId[],
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      characteristics,
    }));
  };

  const updateIntensity = (
    responseKey: PainIntensityResponseKey,
    value: number,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [responseKey]: value,
    }));
  };

  const markComplete = () => {
    setIsComplete(true);
  };

  return (
    <PainAssessmentContext.Provider
      value={{
        responses,
        isComplete,
        updateLocations,
        updateCharacteristics,
        updateIntensity,
        markComplete,
      }}
    >
      {children}
    </PainAssessmentContext.Provider>
  );
}

export function usePainAssessment() {
  const context = useContext(PainAssessmentContext);

  if (!context) {
    throw new Error(
      'usePainAssessment must be used inside PainAssessmentProvider',
    );
  }

  return context;
}

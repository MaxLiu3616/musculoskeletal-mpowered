import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  ExerciseFrequencyId,
  ManagementAssessmentResponses,
  ManagementMedicationId,
} from '@/features/management-assessment/types/ManagementAssessment';

const initialResponses: ManagementAssessmentResponses = {
  medications: [],
  medicationNames: [],
  otcMedication: '',
  exerciseFrequency: null,
  emotionStrategy: '',
};

type ManagementAssessmentContextValue = {
  responses: ManagementAssessmentResponses;
  updateMedications: (medications: ManagementMedicationId[], medicationNames: string[]) => void;
  updateOtcMedication: (medication: string) => void;
  updateExerciseFrequency: (frequency: ExerciseFrequencyId) => void;
  updateEmotionStrategy: (strategy: string) => void;
};

const ManagementAssessmentContext = createContext<
  ManagementAssessmentContextValue | null
>(null);

type ManagementAssessmentProviderProps = {
  children: ReactNode;
};

export function ManagementAssessmentProvider({
  children,
}: ManagementAssessmentProviderProps) {
  const [responses, setResponses] = useState(initialResponses);

  const updateMedications = (medications: ManagementMedicationId[], medicationNames: string[]) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      medications,
      medicationNames,
    }));
  };

  const updateOtcMedication = (otcMedication: string) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      otcMedication,
    }));
  };

  const updateExerciseFrequency = (
    exerciseFrequency: ExerciseFrequencyId,
  ) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      exerciseFrequency,
    }));
  };

  const updateEmotionStrategy = (emotionStrategy: string) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      emotionStrategy,
    }));
  };

  return (
    <ManagementAssessmentContext.Provider
      value={{
        responses,
        updateMedications,
        updateOtcMedication,
        updateExerciseFrequency,
        updateEmotionStrategy,
      }}
    >
      {children}
    </ManagementAssessmentContext.Provider>
  );
}

export function useManagementAssessment() {
  const context = useContext(ManagementAssessmentContext);

  if (!context) {
    throw new Error(
      'useManagementAssessment must be used inside ManagementAssessmentProvider',
    );
  }

  return context;
}

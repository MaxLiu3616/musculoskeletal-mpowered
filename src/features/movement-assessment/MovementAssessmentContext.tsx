import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  GeneralMovementImpactId,
  MovementAssessmentResponses,
  MovementImpactArea,
} from '@/features/movement-assessment/types/MovementAssessment';

const initialResponses: MovementAssessmentResponses = {
  hoursActiveLastWeek: null,
  generalImpacts: [],
  walking: null,
  lifting: null,
  sitting: null,
  standing: null,
  reflection: null,
};

type MovementAssessmentContextValue = {
  responses: MovementAssessmentResponses;
  updateHoursActiveLastWeek: (value: number) => void;
  updateGeneralImpacts: (values: GeneralMovementImpactId[]) => void;
  updateImpact: (area: MovementImpactArea, value: number) => void;
  updateReflection: (value: string) => void;
};

const MovementAssessmentContext = createContext<MovementAssessmentContextValue | null>(null);
type MovementAssessmentProviderProps = {
  children: ReactNode;
};

export function MovementAssessmentProvider({
  children,
}: MovementAssessmentProviderProps) {
  const [responses, setResponses] = useState(initialResponses);

  const updateHoursActiveLastWeek = (value: number) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      hoursActiveLastWeek: value,
    }));
  };

  const updateGeneralImpacts = (values: GeneralMovementImpactId[]) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      generalImpacts: values,
    }));
  };

  const updateImpact = (area: MovementImpactArea, value: number) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [area]: value,
    }));
  };

  const updateReflection = (value: string) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      reflection: value,
    }));
  };

  return (
    <MovementAssessmentContext.Provider
      value={{
        responses,
        updateHoursActiveLastWeek,
        updateGeneralImpacts,
        updateImpact,
        updateReflection,
      }}
    >
      {children}
    </MovementAssessmentContext.Provider>
  );
}

export function useMovementAssessment() {
  const context = useContext(MovementAssessmentContext);
  if (!context) {
    throw new Error(
      'useMovementAssessment must be used inside MovementAssessmentProvider',
    );
  }
  return context;
}

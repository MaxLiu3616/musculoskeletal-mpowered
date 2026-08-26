import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { MovementAssessmentResponses } from '@/features/movement-assessment/types/MovementAssessment';

const initialResponses: MovementAssessmentResponses = {
  hoursActiveLastWeek: null,
};

type MovementAssessmentContextValue = {
  responses: MovementAssessmentResponses;
  isComplete: boolean;
  updateHoursActiveLastWeek: (value: number) => void;
  markComplete: () => void;
};

const MovementAssessmentContext = createContext<MovementAssessmentContextValue | null>(null);
type MovementAssessmentProviderProps = {
  children: ReactNode;
};

export function MovementAssessmentProvider({
  children,
}: MovementAssessmentProviderProps) {
  const [responses, setResponses] = useState(initialResponses);
  const [isComplete, setIsComplete] = useState(false);

  const updateHoursActiveLastWeek = (value: number) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      hoursActiveLastWeek: value,
    }));
  };

  const markComplete = () => {
    setIsComplete(true);
  };

  return (
    <MovementAssessmentContext.Provider
      value={{
        responses,
        isComplete,
        updateHoursActiveLastWeek,
        markComplete,
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
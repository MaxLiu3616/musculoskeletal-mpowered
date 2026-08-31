import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  HomeAssessmentId,
  HomeAssessmentStatus,
} from '@/features/home/components/HomeScreen.data';

const initialAssessmentStatus: Record<
  HomeAssessmentId,
  HomeAssessmentStatus
> = {
  pain: { completed: false },
  movement: { completed: false },
  'personal-care': { completed: false },
  'social-health': { completed: false },
  management: { completed: false },
};

type HomeAssessmentContextValue = {
  assessmentStatus: Record<HomeAssessmentId, HomeAssessmentStatus>;
  markAssessmentComplete: (assessmentId: HomeAssessmentId) => void;
};

const HomeAssessmentContext = createContext<HomeAssessmentContextValue | null>(
  null,
);

type HomeAssessmentProviderProps = {
  children: ReactNode;
};

export function HomeAssessmentProvider({
  children,
}: HomeAssessmentProviderProps) {
  const [assessmentStatus, setAssessmentStatus] = useState(
    initialAssessmentStatus,
  );

  const markAssessmentComplete = (assessmentId: HomeAssessmentId) => {
    setAssessmentStatus((currentStatus) => ({
      ...currentStatus,
      [assessmentId]: {
        ...currentStatus[assessmentId],
        completed: true,
      },
    }));
  };

  return (
    <HomeAssessmentContext.Provider
      value={{ assessmentStatus, markAssessmentComplete }}
    >
      {children}
    </HomeAssessmentContext.Provider>
  );
}

export function useHomeAssessment() {
  const context = useContext(HomeAssessmentContext);

  if (!context) {
    throw new Error(
      'useHomeAssessment must be used inside HomeAssessmentProvider',
    );
  }

  return context;
}

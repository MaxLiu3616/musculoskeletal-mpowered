import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  formatAssessmentCyclePeriod,
  formatAssessmentUpdatedAt,
  getAssessmentCycleEnd,
  isDateInAssessmentCycle,
  parseLocalDateKey,
  toLocalDateKey,
} from '@/features/assessment-cycle/AssessmentCycle.data';

import type {
  HomeAssessmentId,
  HomeAssessmentStatus,
} from '@/features/home/components/HomeScreen.data';

type AssessmentStatusMap = Record<
  HomeAssessmentId,
  HomeAssessmentStatus
>;

type HomeAssessmentState = {
  cycleStart: string | null;

  assessmentStatus:
    AssessmentStatusMap;
};

function createInitialAssessmentStatus():
  AssessmentStatusMap {
  return {
    pain: {
      completed: false,
    },

    movement: {
      completed: false,
    },

    'personal-care': {
      completed: false,
    },

    'social-health': {
      completed: false,
    },

    management: {
      completed: false,
    },
  };
}

const initialState:
  HomeAssessmentState = {
  cycleStart: null,

  assessmentStatus:
    createInitialAssessmentStatus(),
};

type HomeAssessmentContextValue = {
  assessmentStatus:
    AssessmentStatusMap;

  cycleStart: string | null;

  cyclePeriodLabel?: string;

  markAssessmentComplete: (
    assessmentId: HomeAssessmentId,
  ) => void;
};

const HomeAssessmentContext =
  createContext<HomeAssessmentContextValue | null>(
    null,
  );

type HomeAssessmentProviderProps = {
  children: ReactNode;
};

export function HomeAssessmentProvider({
  children,
}: HomeAssessmentProviderProps) {
  const [
    state,
    setState,
  ] = useState<HomeAssessmentState>(
    initialState,
  );

  const markAssessmentComplete = (
    assessmentId: HomeAssessmentId,
  ) => {
    const now = new Date();

    setState((currentState) => {
      const hasActiveCycle =
        currentState.cycleStart !==
          null &&
        isDateInAssessmentCycle(
          now,
          currentState.cycleStart,
        );

      const cycleStart =
        hasActiveCycle
          ? currentState.cycleStart!
          : toLocalDateKey(now);

      const baseStatus =
        hasActiveCycle
          ? currentState.assessmentStatus
          : createInitialAssessmentStatus();

      return {
        cycleStart,

        assessmentStatus: {
          ...baseStatus,

          [assessmentId]: {
            ...baseStatus[
              assessmentId
            ],

            completed: true,

            updatedAt:
              formatAssessmentUpdatedAt(
                now,
              ),
          },
        },
      };
    });
  };

  useEffect(() => {
    if (!state.cycleStart) {
      return;
    }

    const cycleEnd =
      getAssessmentCycleEnd(
        state.cycleStart,
      );

    const nextCycleDate =
      parseLocalDateKey(
        cycleEnd,
      );

    nextCycleDate.setDate(
      nextCycleDate.getDate() + 1,
    );

    nextCycleDate.setHours(
      0,
      0,
      0,
      0,
    );

    const millisecondsUntilReset =
      nextCycleDate.getTime() -
      Date.now();

    if (
      millisecondsUntilReset <= 0
    ) {
      setState({
        cycleStart: null,

        assessmentStatus:
          createInitialAssessmentStatus(),
      });

      return;
    }

    const timeout =
      setTimeout(() => {
        setState({
          cycleStart: null,

          assessmentStatus:
            createInitialAssessmentStatus(),
        });
      }, millisecondsUntilReset);

    return () => {
      clearTimeout(timeout);
    };
  }, [state.cycleStart]);

  const cyclePeriodLabel =
    formatAssessmentCyclePeriod(
      state.cycleStart,
    );

  return (
    <HomeAssessmentContext.Provider
      value={{
        assessmentStatus:
          state.assessmentStatus,

        cycleStart:
          state.cycleStart,

        cyclePeriodLabel,

        markAssessmentComplete,
      }}
    >
      {children}
    </HomeAssessmentContext.Provider>
  );
}

export function useHomeAssessment() {
  const context =
    useContext(
      HomeAssessmentContext,
    );

  if (!context) {
    throw new Error(
      'useHomeAssessment must be used inside HomeAssessmentProvider',
    );
  }

  return context;
}

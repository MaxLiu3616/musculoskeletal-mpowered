import {
  createContext,
  useCallback,
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

import {
  loadAssessmentRecords,
} from '@/services/assessment';

import {
  supabase,
} from '@/services/supabase';

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

function createInitialState():
  HomeAssessmentState {
  return {
    cycleStart: null,

    assessmentStatus:
      createInitialAssessmentStatus(),
  };
}

type HomeAssessmentContextValue = {
  assessmentStatus:
    AssessmentStatusMap;

  cycleStart: string | null;

  cyclePeriodLabel?: string;

  markAssessmentComplete: (
    assessmentId: HomeAssessmentId,
  ) => void;

  reset: () => void;
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
    createInitialState,
  );

  const loadAssessmentStatus =
    useCallback(async () => {
      try {
        const records =
          await loadAssessmentRecords();

        const now =
          new Date();

        const activeRecords =
          records.filter(
            (record) =>
              isDateInAssessmentCycle(
                now,
                record.weekStart,
              ),
          );

        if (
          activeRecords.length === 0
        ) {
          setState(
            createInitialState(),
          );

          return;
        }

        const activeCycleStart =
          activeRecords
            .map(
              (record) =>
                record.weekStart,
            )
            .sort()
            .reverse()[0];

        const cycleRecords =
          activeRecords.filter(
            (record) =>
              record.weekStart ===
              activeCycleStart,
          );

        const restoredStatus =
          createInitialAssessmentStatus();

        cycleRecords.forEach(
          (record) => {
            restoredStatus[
              record.type
            ] = {
              completed: true,

              updatedAt:
                formatAssessmentUpdatedAt(
                  new Date(
                    record.completedAt,
                  ),
                ),
            };
          },
        );

        setState({
          cycleStart:
            activeCycleStart,

          assessmentStatus:
            restoredStatus,
        });
      } catch (error) {
        console.error(
          'Failed to load assessment status:',
          error,
        );
      }
    }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (event, session) => {
          if (
            event === 'SIGNED_OUT' ||
            !session
          ) {
            setState(
              createInitialState(),
            );

            return;
          }

          if (
            event ===
              'INITIAL_SESSION' ||
            event === 'SIGNED_IN'
          ) {
            setTimeout(() => {
              void loadAssessmentStatus();
            }, 0);
          }
        },
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [
    loadAssessmentStatus,
  ]);

  const markAssessmentComplete =
    useCallback(
      (
        assessmentId:
          HomeAssessmentId,
      ) => {
        const now =
          new Date();

        setState(
          (
            currentState,
          ) => {
            const hasActiveCycle =
              currentState.cycleStart !==
                null &&
              isDateInAssessmentCycle(
                now,
                currentState.cycleStart,
              );

            const cycleStart =
              hasActiveCycle
                ? currentState
                    .cycleStart!
                : toLocalDateKey(
                    now,
                  );

            const baseStatus =
              hasActiveCycle
                ? currentState
                    .assessmentStatus
                : createInitialAssessmentStatus();

            return {
              cycleStart,

              assessmentStatus: {
                ...baseStatus,

                [assessmentId]: {
                  ...baseStatus[
                    assessmentId
                  ],

                  completed:
                    true,

                  updatedAt:
                    formatAssessmentUpdatedAt(
                      now,
                    ),
                },
              },
            };
          },
        );
      },
      [],
    );

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
      nextCycleDate.getDate() +
        1,
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
      setState(
        createInitialState(),
      );

      return;
    }

    const timeout =
      setTimeout(() => {
        setState(
          createInitialState(),
        );
      }, millisecondsUntilReset);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    state.cycleStart,
  ]);

  const reset =
    useCallback(() => {
      setState(
        createInitialState(),
      );
    }, []);

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

        reset,
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
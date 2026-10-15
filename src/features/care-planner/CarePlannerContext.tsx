import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import type {
  AssessmentRecord,
} from '@/features/my-health/MyHealth.types';

import {
  createAppointmentPlan,
  loadAppointmentPlans,
  updateAppointmentPlan,
} from '@/services/appointmentPlans';

import { supabase } from '@/services/supabase';

import {
  changePlanQuestions,
  createAppointmentDraft,
  hasSignature,
  isValidPlan,
} from './CarePlanner.data';

import type {
  AppointmentAnswer,
  AppointmentPlan,
} from './CarePlanner.types';

type CarePlannerContextValue = {
  plans: AppointmentPlan[];

  draft: AppointmentPlan;

  startPlan: (
    records: AssessmentRecord[],
  ) => void;

  updateDraft: (
    changes: Partial<AppointmentPlan>,
  ) => void;

  saveDraft: () =>
    Promise<boolean>;

  saveQuestions: (
    id: string,
    questionIds: string[],
  ) => Promise<boolean>;

  saveConsent: (
    id: string,
    paths: string[],
  ) => Promise<boolean>;

  saveAnswer: (
    id: string,
    questionId: string,
    answer: AppointmentAnswer,
  ) => Promise<boolean>;

  reset: () => void;
};

const CarePlannerContext =
  createContext<CarePlannerContextValue | null>(
    null,
  );

function sortPlans(
  plans: AppointmentPlan[],
) {
  return [...plans].sort(
    (a, b) =>
      a.appointmentDate.localeCompare(
        b.appointmentDate,
      ),
  );
}

export function CarePlannerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    plans,
    setPlans,
  ] =
    useState<AppointmentPlan[]>([]);

  const [
    draft,
    setDraft,
  ] = useState(
    () =>
      createAppointmentDraft(
        'draft-0',
        [],
      ),
  );

  const draftCounter =
    useRef(0);

  const activeUserId =
    useRef<string | null>(
      null,
    );

  const restorePlans =
    useCallback(
      async (
        userId: string,
      ) => {
        try {
          const storedPlans =
            await loadAppointmentPlans();

          if (
            activeUserId.current !==
            userId
          ) {
            return;
          }

          setPlans(
            sortPlans(
              storedPlans,
            ),
          );
        } catch (error) {
          console.error(
            'Failed to load appointment plans:',
            error,
          );
        }
      },
      [],
    );

  useEffect(() => {
    const { data } =
      supabase.auth.onAuthStateChange(
        (
          event,
          session,
        ) => {
          activeUserId.current =
            session?.user.id ??
            null;

          if (!session) {
            setPlans([]);

            setDraft(
              createAppointmentDraft(
                'draft-0',
                [],
              ),
            );

            draftCounter.current =
              0;

            return;
          }

          if (
            event ===
              'INITIAL_SESSION' ||
            event ===
              'SIGNED_IN'
          ) {
            const userId =
              session.user.id;

            setTimeout(
              () => {
                void restorePlans(
                  userId,
                );
              },
              0,
            );
          }
        },
      );

    return () => {
      data.subscription.unsubscribe();
    };
  }, [
    restorePlans,
  ]);

  const startPlan =
    useCallback(
      (
        records:
          AssessmentRecord[],
      ) => {
        draftCounter.current +=
          1;

        setDraft(
          createAppointmentDraft(
            `draft-${draftCounter.current}`,
            records,
          ),
        );
      },
      [],
    );

  const updateDraft =
    useCallback(
      (
        changes:
          Partial<AppointmentPlan>,
      ) => {
        setDraft(
          (current) => ({
            ...current,
            ...changes,
          }),
        );
      },
      [],
    );

  const saveDraft =
    useCallback(
      async () => {
        if (
          !isValidPlan(
            draft,
          )
        ) {
          return false;
        }

        const requestUserId =
          activeUserId.current;

        if (!requestUserId) {
          return false;
        }

        const snapshot =
          JSON.parse(
            JSON.stringify(
              draft,
            ),
          ) as AppointmentPlan;

        try {
          const existing =
            plans.some(
              (plan) =>
                plan.id ===
                snapshot.id,
            );

          const saved =
            existing
              ? await updateAppointmentPlan(
                  snapshot.id,
                  snapshot,
                )
              : await createAppointmentPlan(
                  snapshot,
                );

          if (
            activeUserId.current !==
            requestUserId
          ) {
            return false;
          }

          setPlans(
            (current) =>
              sortPlans([
                ...current.filter(
                  (plan) =>
                    plan.id !==
                    saved.id,
                ),
                saved,
              ]),
          );

          setDraft(
            saved,
          );

          return true;
        } catch (error) {
          console.error(
            'Failed to save appointment plan:',
            error,
          );

          return false;
        }
      },
      [
        draft,
        plans,
      ],
    );

  const saveQuestions =
    useCallback(
      async (
        id: string,
        questionIds: string[],
      ) => {
        const plan =
          plans.find(
            (item) =>
              item.id === id,
          );

        if (!plan) {
          return false;
        }

        const requestUserId =
          activeUserId.current;

        if (!requestUserId) {
          return false;
        }

        const updated =
          changePlanQuestions(
            plan,
            questionIds,
          );

        try {
          const saved =
            await updateAppointmentPlan(
              id,
              updated,
            );

          if (
            activeUserId.current !==
            requestUserId
          ) {
            return false;
          }

          setPlans(
            (current) =>
              current.map(
                (item) =>
                  item.id === id
                    ? saved
                    : item,
              ),
          );

          return true;
        } catch (error) {
          console.error(
            'Failed to save appointment questions:',
            error,
          );

          return false;
        }
      },
      [
        plans,
      ],
    );

  const saveConsent =
    useCallback(
      async (
        id: string,
        paths: string[],
      ) => {
        if (
          !hasSignature(
            paths,
          )
        ) {
          return false;
        }

        const plan =
          plans.find(
            (item) =>
              item.id === id,
          );

        if (!plan) {
          return false;
        }

        const requestUserId =
          activeUserId.current;

        if (!requestUserId) {
          return false;
        }

        const updated:
          AppointmentPlan = {
          ...plan,

          consent: {
            paths: [
              ...paths,
            ],

            signedAt:
              new Date().toISOString(),
          },
        };

        try {
          const saved =
            await updateAppointmentPlan(
              id,
              updated,
            );

          if (
            activeUserId.current !==
            requestUserId
          ) {
            return false;
          }

          setPlans(
            (current) =>
              current.map(
                (item) =>
                  item.id === id
                    ? saved
                    : item,
              ),
          );

          return true;
        } catch (error) {
          console.error(
            'Failed to save recording consent:',
            error,
          );

          return false;
        }
      },
      [
        plans,
      ],
    );

  const saveAnswer =
    useCallback(
      async (
        id: string,
        questionId: string,
        answer: AppointmentAnswer,
      ) => {
        const plan =
          plans.find(
            (item) =>
              item.id === id,
          );

        if (
          !plan ||
          !plan.consent ||
          !plan.selectedIds.includes(
            questionId,
          )
        ) {
          return false;
        }

        const requestUserId =
          activeUserId.current;

        if (!requestUserId) {
          return false;
        }

        const updated:
          AppointmentPlan = {
          ...plan,

          answers: {
            ...plan.answers,

            [questionId]: {
              ...answer,

              text:
                answer.text.trim(),
            },
          },
        };

        try {
          const saved =
            await updateAppointmentPlan(
              id,
              updated,
            );

          if (
            activeUserId.current !==
            requestUserId
          ) {
            return false;
          }

          setPlans(
            (current) =>
              current.map(
                (item) =>
                  item.id === id
                    ? saved
                    : item,
              ),
          );

          return true;
        } catch (error) {
          console.error(
            'Failed to save appointment answer:',
            error,
          );

          return false;
        }
      },
      [
        plans,
      ],
    );

  const reset =
    useCallback(() => {
      setPlans([]);

      setDraft(
        createAppointmentDraft(
          'draft-0',
          [],
        ),
      );

      draftCounter.current =
        0;

      activeUserId.current =
        null;
    }, []);

  return (
    <CarePlannerContext.Provider
      value={{
        plans,
        draft,
        startPlan,
        updateDraft,
        saveDraft,
        saveQuestions,
        saveConsent,
        saveAnswer,
        reset,
      }}
    >
      {children}
    </CarePlannerContext.Provider>
  );
}

export function useCarePlanner() {
  const context =
    useContext(
      CarePlannerContext,
    );

  if (!context) {
    throw new Error(
      'useCarePlanner must be used inside CarePlannerProvider',
    );
  }

  return context;
}
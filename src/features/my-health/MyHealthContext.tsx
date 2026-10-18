import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  isValidPrescription,
  updateAssessmentRecords,
} from './MyHealth.data';

import type {
  AssessmentRecord,
  AssessmentRecordDraft,
  Prescription,
  PrescriptionInput,
} from './MyHealth.types';

import {
  toLocalDateKey,
} from '@/features/assessment-cycle/AssessmentCycle.data';

import {
  loadAssessmentRecords,
  saveAssessmentSummary,
} from '@/services/assessment';

import {
  createPrescription,
  deletePrescription,
  loadPrescriptions,
  updatePrescription,
} from '@/services/prescriptions';

import { supabase } from '@/services/supabase';

type MyHealthContextValue = {
  records: AssessmentRecord[];

  prescriptions: Prescription[];

  saveAssessment: (
    record: AssessmentRecordDraft,
    cycleStart?: string,
  ) => void;

  savePrescription: (
    input: PrescriptionInput,
    id?: string,
  ) => Promise<boolean>;

  removePrescription: (
    id: string,
  ) => Promise<boolean>;

  reset: () => void;
};

const MyHealthContext =
  createContext<MyHealthContextValue | null>(
    null,
  );

export function MyHealthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    records,
    setRecords,
  ] = useState<AssessmentRecord[]>([]);

  const [
    prescriptions,
    setPrescriptions,
  ] = useState<Prescription[]>([]);

  const activeUserId =
    useRef<string | null>(
      null,
    );

  const loadHealthData =
    useCallback(
      async (
        userId: string,
      ) => {
        try {
          const [
            storedRecords,
            storedPrescriptions,
          ] = await Promise.all([
            loadAssessmentRecords(),
            loadPrescriptions(),
          ]);

          if (
            activeUserId.current !==
            userId
          ) {
            return;
          }

          setRecords(
            storedRecords,
          );

          setPrescriptions(
            storedPrescriptions,
          );
        } catch (error) {
          console.error(
            'Failed to load My Health data:',
            error,
          );
        }
      },
      [],
    );

  useEffect(() => {
    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (
          event,
          session,
        ) => {
          activeUserId.current =
            session?.user.id ??
            null;

          if (!session) {
            setRecords([]);
            setPrescriptions([]);
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
                void loadHealthData(
                  userId,
                );
              },
              0,
            );
          }
        },
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [
    loadHealthData,
  ]);

  const saveAssessment =
    useCallback(
      (
        record: AssessmentRecordDraft,
        cycleStart?: string,
      ) => {
        const recordCycleStart =
          cycleStart ??
          toLocalDateKey(
            new Date(),
          );

        setRecords(
          (current) =>
            updateAssessmentRecords(
              current,
              record,
              recordCycleStart,
            ),
        );

        void saveAssessmentSummary(
          record,
          recordCycleStart,
        ).catch(
          (error) => {
            console.error(
              'Failed to save assessment:',
              error,
            );
          },
        );
      },
      [],
    );

  const savePrescription =
    useCallback(
      async (
        input: PrescriptionInput,
        id?: string,
      ) => {
        if (
          !isValidPrescription(
            input,
          )
        ) {
          return false;
        }

        const normalizedInput:
          PrescriptionInput = {
          ...input,

          name:
            input.name.trim(),

          strength:
            input.strength.trim(),

          dosage:
            input.dosage.trim(),

          repeatEvery:
            input.repeatEvery.trim(),
        };

        try {
          if (id) {
            const updated =
              await updatePrescription(
                id,
                normalizedInput,
              );

            setPrescriptions(
              (current) =>
                current.map(
                  (item) =>
                    item.id === id
                      ? updated
                      : item,
                ),
            );

            return true;
          }

          const created =
            await createPrescription(
              normalizedInput,
            );

          setPrescriptions(
            (current) => [
              ...current,
              created,
            ],
          );

          return true;
        } catch (error) {
          console.error(
            'Failed to save prescription:',
            error,
          );

          return false;
        }
      },
      [],
    );

  const removePrescription =
    useCallback(
      async (
        id: string,
      ) => {
        try {
          await deletePrescription(
            id,
          );

          setPrescriptions(
            (current) =>
              current.filter(
                (item) =>
                  item.id !== id,
              ),
          );

          return true;
        } catch (error) {
          console.error(
            'Failed to remove prescription:',
            error,
          );

          return false;
        }
      },
      [],
    );

  const reset =
    useCallback(() => {
      setRecords([]);
      setPrescriptions([]);

      activeUserId.current =
        null;
    }, []);

  return (
    <MyHealthContext.Provider
      value={{
        records,
        prescriptions,
        saveAssessment,
        savePrescription,
        removePrescription,
        reset,
      }}
    >
      {children}
    </MyHealthContext.Provider>
  );
}

export function useMyHealth() {
  const context =
    useContext(
      MyHealthContext,
    );

  if (!context) {
    throw new Error(
      'useMyHealth must be used inside MyHealthProvider',
    );
  }

  return context;
}
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
  ) => void;

  removePrescription: (
    id: string,
  ) => void;

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

  const nextPrescriptionId =
    useRef(0);

  const loadRecords =
    useCallback(async () => {
      try {
        const storedRecords =
          await loadAssessmentRecords();

        setRecords(storedRecords);
      } catch (error) {
        console.error(
          'Failed to load assessment records:',
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
            setRecords([]);
            return;
          }

          if (
            event === 'INITIAL_SESSION' ||
            event === 'SIGNED_IN'
          ) {
            setTimeout(() => {
              void loadRecords();
            }, 0);
          }
        },
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [loadRecords]);

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

        setRecords((current) =>
          updateAssessmentRecords(
            current,
            record,
            recordCycleStart,
          ),
        );

        void saveAssessmentSummary(
          record,
          recordCycleStart,
        ).catch((error) => {
          console.error(
            'Failed to save assessment:',
            error,
          );
        });
      },
      [],
    );

  const savePrescription =
    useCallback(
      (
        input: PrescriptionInput,
        id?: string,
      ) => {
        if (
          !isValidPrescription(
            input,
          )
        ) {
          return;
        }

        const prescription: Prescription = {
          ...input,

          name:
            input.name.trim(),

          strength:
            input.strength.trim(),

          dosage:
            input.dosage.trim(),

          repeatEvery:
            input.repeatEvery.trim(),

          id:
            id ??
            `prescription-${++nextPrescriptionId.current}`,
        };

        setPrescriptions(
          (current) =>
            id
              ? current.map(
                  (item) =>
                    item.id === id
                      ? prescription
                      : item,
                )
              : [
                  ...current,
                  prescription,
                ],
        );
      },
      [],
    );

  const removePrescription =
    useCallback(
      (id: string) => {
        setPrescriptions(
          (current) =>
            current.filter(
              (item) =>
                item.id !== id,
            ),
        );
      },
      [],
    );

  const reset =
    useCallback(() => {
      setRecords([]);
      setPrescriptions([]);

      nextPrescriptionId.current =
        0;
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
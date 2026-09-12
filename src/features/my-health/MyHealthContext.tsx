import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

import { isValidPrescription, updateAssessmentRecords } from './MyHealth.data';
import type { AssessmentRecord, AssessmentRecordDraft, Prescription, PrescriptionInput } from './MyHealth.types';

type MyHealthContextValue = {
  records: AssessmentRecord[];
  prescriptions: Prescription[];
  saveAssessment: (record: AssessmentRecordDraft) => void;
  savePrescription: (input: PrescriptionInput, id?: string) => void;
  removePrescription: (id: string) => void;
};

const MyHealthContext = createContext<MyHealthContextValue | null>(null);

export function MyHealthProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const nextPrescriptionId = useRef(0);

  const saveAssessment = useCallback((record: AssessmentRecordDraft) => {
    setRecords((current) => updateAssessmentRecords(current, record));
  }, []);

  const savePrescription = (input: PrescriptionInput, id?: string) => {
    if (!isValidPrescription(input)) return;
    const prescription: Prescription = {
      ...input,
      name: input.name.trim(),
      strength: input.strength.trim(),
      dosage: input.dosage.trim(),
      repeatEvery: input.repeatEvery.trim(),
      id: id ?? `prescription-${++nextPrescriptionId.current}`,
    };
    setPrescriptions((current) => id
      ? current.map((item) => item.id === id ? prescription : item)
      : [...current, prescription]);
  };

  const removePrescription = (id: string) => {
    setPrescriptions((current) => current.filter((item) => item.id !== id));
  };

  return (
    <MyHealthContext.Provider value={{ records, prescriptions, saveAssessment, savePrescription, removePrescription }}>
      {children}
    </MyHealthContext.Provider>
  );
}

export function useMyHealth() {
  const context = useContext(MyHealthContext);
  if (!context) throw new Error('useMyHealth must be used inside MyHealthProvider');
  return context;
}

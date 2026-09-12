import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

import type { AssessmentRecord } from '@/features/my-health/MyHealth.types';

import { changePlanQuestions, createAppointmentDraft, hasSignature, isValidPlan } from './CarePlanner.data';
import type { AppointmentAnswer, AppointmentPlan } from './CarePlanner.types';

type CarePlannerContextValue = {
  plans: AppointmentPlan[];
  draft: AppointmentPlan;
  startPlan: (records: AssessmentRecord[]) => void;
  updateDraft: (changes: Partial<AppointmentPlan>) => void;
  saveDraft: () => void;
  saveQuestions: (id: string, questionIds: string[]) => void;
  saveConsent: (id: string, paths: string[]) => void;
  saveAnswer: (id: string, questionId: string, answer: AppointmentAnswer) => void;
};

const CarePlannerContext = createContext<CarePlannerContextValue | null>(null);

export function CarePlannerProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<AppointmentPlan[]>([]);
  const [draft, setDraft] = useState(() => createAppointmentDraft('appointment-1', []));
  const nextId = useRef(1);

  const startPlan = (records: AssessmentRecord[]) => setDraft(createAppointmentDraft(`appointment-${++nextId.current}`, records));
  const updateDraft = (changes: Partial<AppointmentPlan>) => setDraft((current) => ({ ...current, ...changes }));
  const saveDraft = () => {
    if (!isValidPlan(draft)) return;
    const saved = JSON.parse(JSON.stringify(draft)) as AppointmentPlan;
    setPlans((current) => [...current.filter((plan) => plan.id !== saved.id), saved]
      .sort((a, b) => a.appointmentDate.localeCompare(b.appointmentDate)));
  };
  const saveQuestions = (id: string, questionIds: string[]) => {
    setPlans((current) => current.map((plan) => plan.id === id ? changePlanQuestions(plan, questionIds) : plan));
  };
  const saveConsent = (id: string, paths: string[]) => {
    if (!hasSignature(paths)) return;
    setPlans((current) => current.map((plan) => plan.id === id
      ? { ...plan, consent: { paths: [...paths], signedAt: new Date().toISOString() } } : plan));
  };
  const saveAnswer = (id: string, questionId: string, answer: AppointmentAnswer) => {
    setPlans((current) => current.map((plan) => plan.id === id && plan.consent && plan.selectedIds.includes(questionId)
      ? { ...plan, answers: { ...plan.answers, [questionId]: { ...answer, text: answer.text.trim() } } } : plan));
  };

  return <CarePlannerContext.Provider value={{ plans, draft, startPlan, updateDraft, saveDraft, saveQuestions, saveConsent, saveAnswer }}>{children}</CarePlannerContext.Provider>;
}

export function useCarePlanner() {
  const context = useContext(CarePlannerContext);
  if (!context) throw new Error('useCarePlanner must be used inside CarePlannerProvider');
  return context;
}

import type { HomeAssessmentId } from '@/features/home/components/HomeScreen.data';
import type { PainAssessmentResponses } from '@/features/pain-tracker/types/PainAssessment';

export type HealthSection = {
  title: string;
  items: { label: string; value: string }[];
};

export type AssessmentRecordDraft = {
  type: HomeAssessmentId;
  sections: HealthSection[];
  periodLabel?: string;
  pain?: PainAssessmentResponses;
};

export type AssessmentRecord = AssessmentRecordDraft & {
  id: string;
  weekStart: string;
  completedAt: string;
};

export type Prescription = {
  id: string;
  name: string;
  strength: string;
  strengthUnit: 'mg' | 'g' | '%' | 'μg' | 'iu';
  form: 'Tablet' | 'Capsule' | 'Liquid' | 'Drops' | 'Injections' | 'Spray' | 'mL' | 'Patches';
  dosage: string;
  repeatEvery: string;
  timeUnit: 'hour' | 'day' | 'week' | 'month';
};

export type PrescriptionInput = Omit<Prescription, 'id'>;
export type PainMetric = 'averagePain' | 'worstPain' | 'mildestPain';

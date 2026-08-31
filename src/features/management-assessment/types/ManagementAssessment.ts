export type ManagementMedicationId =
  | 'perindopril'
  | 'candesartan'
  | 'amlodipine'
  | 'vitamin-d3'
  | 'raloxifene';

export type ExerciseFrequencyId =
  | '0-days'
  | '1-2-days'
  | '3-4-days'
  | '5-6-days'
  | '7-days';

export type ManagementAssessmentResponses = {
  medications: ManagementMedicationId[];
  otcMedication: string;
  exerciseFrequency: ExerciseFrequencyId | null;
  emotionStrategy: string;
};

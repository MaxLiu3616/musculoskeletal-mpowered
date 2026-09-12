export type ManagementMedicationId = string;

export type ExerciseFrequencyId =
  | '0-days'
  | '1-2-days'
  | '3-4-days'
  | '5-6-days'
  | '7-days';

export type ManagementAssessmentResponses = {
  medications: ManagementMedicationId[];
  medicationNames: string[];
  otcMedication: string;
  exerciseFrequency: ExerciseFrequencyId | null;
  emotionStrategy: string;
};

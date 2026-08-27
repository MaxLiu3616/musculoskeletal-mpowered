export const homeAssessments = [
  { id: 'pain', label: 'My Pain' },
  { id: 'movement', label: 'My Movement' },
  { id: 'personal-care', label: 'My Personal Care' },
  { id: 'social-health', label: 'My Social Health' },
  { id: 'management', label: 'My Management' },
] as const;

export type HomeAssessmentId = (typeof homeAssessments)[number]['id'];

export const homeScreenCopy = {
  greetingPrefix: 'Good morning',
  heading: "Let's build your MPowered plan.",
  subtitle:
    'Assess your pain intensity and its impacts weekly to obtain empowered plan',

  progressLabel: 'This week progress',
  assessmentsLabel: 'assessments',

  assessmentSectionTitle: "This week's assessment",
  recordLabel: 'Record',
  updatedLabel: 'Updated by',

  reflectionLabel: 'Add a reflection for this week',
  supportedByLabel: 'Supported by ABBVIE',
} as const;

export type HomeAssessmentStatus = {
  completed: boolean;
  updatedAt?: string;
};
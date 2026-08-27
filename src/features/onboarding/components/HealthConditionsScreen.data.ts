export const diagnosisOptions = [
  { id: 'yes', label: 'Yes, I have' },
  { id: 'no', label: "No, I haven't" },
] as const;

export type DiagnosisOptionId = (typeof diagnosisOptions)[number]['id'];

export const conditionOptions = [
  { id: 'arthritis', label: 'Arthritis' },
  { id: 'ankylosing-spondylitis', label: 'Ankylosing spondylitis' },
  { id: 'back-pain', label: 'Back pain' },
  { id: 'bakers-cyst', label: "Baker's cyst" },
  { id: 'bursitis', label: 'Bursitis' },
  { id: 'foot-related-conditions', label: 'Foot related conditions' },
  { id: 'fibromyalgia', label: 'Fibromyalgia' },
  { id: 'gout', label: 'Gout' },
  { id: 'juvenile-idiopathic-arthritis', label: 'Juvenile idiopathic arthritis' },
  { id: 'hand-conditions', label: 'Hand conditions' },
  { id: 'lupus', label: 'Lupus' },
] as const;

export type ConditionOptionId = (typeof conditionOptions)[number]['id'];

export const healthDiagnosisScreenCopy = {
  title:
    'Do you have a musculoskeletal (for example arthritis, back pain, gout) or chronic pain diagnosis from your doctor?',
  information:
    'No diagnosis? No problem! You know your body and how you feel so being Health MPowered is for you :)',
  continueLabel: 'Continue',
} as const;

export const conditionSelectionScreenCopy = {
  title:
    "Tell us about the musculoskeletal or chronic pain you're experiencing",
  helper: 'You can select multiple conditions',
  searchPlaceholder: 'Search conditions',
  clearSearchLabel: 'Clear condition search',
  noResults: 'No matching conditions',
  continueLabel: 'Continue',
  skipLabel: 'Skip this question',
} as const;

export const otherConditionsScreenCopy = {
  title: 'Do you have any other conditions?',
  inputPlaceholder: 'Type conditions or symptoms that you know',
  continueLabel: 'Continue',
  skipLabel: 'Skip this question',
} as const;

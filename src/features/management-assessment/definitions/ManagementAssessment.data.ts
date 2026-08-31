import type {
  ExerciseFrequencyId,
  ManagementAssessmentResponses,
  ManagementMedicationId,
} from '@/features/management-assessment/types/ManagementAssessment';

export const managementMedicationOptions: readonly {
  id: ManagementMedicationId;
  name: string;
  schedule: string;
}[] = [
  {
    id: 'perindopril',
    name: 'Perindopril arginine 5 mg',
    schedule: 'Once daily',
  },
  {
    id: 'candesartan',
    name: 'Candesartan 16 mg',
    schedule: 'Once daily',
  },
  {
    id: 'amlodipine',
    name: 'Amlodipine 5 mg',
    schedule: 'Once daily',
  },
  {
    id: 'vitamin-d3',
    name: 'Vitamin D3 1000 IU',
    schedule: 'Once daily',
  },
  {
    id: 'raloxifene',
    name: 'Raloxifene 60 mg',
    schedule: 'Once daily',
  },
];

export const exerciseFrequencyOptions: readonly {
  id: ExerciseFrequencyId;
  label: string;
}[] = [
  { id: '0-days', label: '0 days' },
  { id: '1-2-days', label: '1-2 days' },
  { id: '3-4-days', label: '3-4 days' },
  { id: '5-6-days', label: '5-6 days' },
  { id: '7-days', label: '7 days' },
];

export const managementAssessmentCopy = {
  trackerTitle: 'Pain Tracker',
  assessmentTitle: 'My Management',
  backLabel: '‹ Back',
  recordLabel: 'Record →',
  medicationTitle: 'Medication',
  medicationPrompt:
    'Over the past week, select medications that you consumed to manage your pain.',
  medicationHelper: 'Not taking medications? Just click the record button.',
  medicationSource: 'Generated based on your medication scripts',
  otcPrompt:
    'Over the past week, did you consume any over-the-counter (OTC) medication?',
  otcHelper: 'Not taking OTC medications? Just click the record button.',
  otcPlaceholder: 'Enter an over-the-counter medication',
  exerciseTitle: 'Exercise',
  exercisePrompt:
    'In the past 7 days, did you perform any exercises to manage your musculoskeletal pain or improve your movement?',
  exerciseHelper:
    'Examples: walking, stretching, strengthening, yoga, resistance band work, or balance exercises.',
  emotionTitle: 'Emotion',
  emotionPrompt:
    'Over the past week, did you perform any strategies to manage your stress level or emotion?',
  emotionHelper: 'Examples: meditation, journaling, meeting people.',
  emotionPlaceholder: 'Describe the strategies you used',
  summaryScreenTitle: 'My Pain Summary',
  summaryIntro:
    'Your answers help your doctor focus on what matters most to your daily life.',
  summaryTitle: 'Summary',
  exploreTipsLabel: 'Explore tips on managing pain',
  resultsTitle: 'My results:',
  journalStatus: 'Available during this session',
  closeLabel: 'Close',
} as const;

export const managementPainTipsUrl = 'https://muscha.org/pain-guide/';

export function getManagementPeriodLabel(today = new Date()) {
  const periodEnd = new Date(today);
  periodEnd.setDate(periodEnd.getDate() - 1);

  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - 6);

  const month = new Intl.DateTimeFormat('en-AU', { month: 'short' });

  if (periodStart.getMonth() === periodEnd.getMonth()) {
    return `${periodStart.getDate()}-${periodEnd.getDate()} ${month.format(periodEnd)}`;
  }

  return `${periodStart.getDate()} ${month.format(periodStart)}-${periodEnd.getDate()} ${month.format(periodEnd)}`;
}

export function findExerciseFrequencyLabel(id: ExerciseFrequencyId) {
  return exerciseFrequencyOptions.find((option) => option.id === id)?.label;
}

export function getMedicationResult(
  responses: ManagementAssessmentResponses,
) {
  const prescribedNames = managementMedicationOptions
    .filter((option) => responses.medications.includes(option.id))
    .map((option) => option.name);
  const otcMedication = responses.otcMedication.trim();

  if (prescribedNames.length === 0 && !otcMedication) {
    return 'You did not record any medications this week.';
  }

  const results: string[] = [];

  if (prescribedNames.length > 0) {
    results.push(`You recorded ${prescribedNames.join(', ')}.`);
  }

  if (otcMedication) {
    results.push(`You also recorded ${otcMedication} as an OTC medication.`);
  }

  return results.join(' ');
}

export function getExerciseResult(id: ExerciseFrequencyId) {
  if (id === '0-days') {
    return 'You did not exercise to manage your pain this week.';
  }

  return `You exercised for ${findExerciseFrequencyLabel(id)} this week.`;
}

export function getEmotionResult(strategy: string) {
  const trimmedStrategy = strategy.trim();

  return trimmedStrategy
    ? `You recorded: ${trimmedStrategy}`
    : 'You did not record a dedicated strategy to manage your mood.';
}

export function getManagementOverview(
  responses: ManagementAssessmentResponses,
) {
  const actions: string[] = [];

  if (responses.medications.length > 0 || responses.otcMedication.trim()) {
    actions.push('recorded medication use');
  }

  if (
    responses.exerciseFrequency &&
    responses.exerciseFrequency !== '0-days'
  ) {
    actions.push('exercised to manage your pain');
  }

  if (responses.emotionStrategy.trim()) {
    actions.push('used an emotional wellbeing strategy');
  }

  if (actions.length === 0) {
    return 'You completed your self-management check-in for this week.';
  }

  if (actions.length === 1) {
    return `This week, you ${actions[0]}.`;
  }

  const finalAction = actions.at(-1);
  const earlierActions = actions.slice(0, -1).join(', ');

  return `This week, you ${earlierActions} and ${finalAction}.`;
}

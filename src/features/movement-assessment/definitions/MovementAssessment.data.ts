import type {
  GeneralMovementImpactId,
  MovementImpactArea,
} from '@/features/movement-assessment/types/MovementAssessment';

export const movementAssessmentCopy = {
  trackerTitle: 'Pain Tracker',
  assessmentTitle: 'My Movement',
  backLabel: '‹ Back',
  recordLabel: 'Record →',
  generalImpactsTitle: 'General Movement Impacts',
  generalImpactsQuestion:
    'On average, how many hours per day were you able to stay active or mobile last week?',
  generalImpactsPlaceholder: 'input number only',
  generalImpactsHelper:
    'Stay active could mean doing your typical activities like working, driving, doing house chores, meeting with people, et cetera',
  selectAllPrompt: 'Select ALL relevant statements:',
  selectMostPrompt: 'Select the MOST relevant statement:',
  reflectionTitle: 'Reflection on your movement',
  reflectionQuestion:
    'Write any reflections of pain impacts on your mobility.',
  reflectionPlaceholder:
    'For instance, when pain occurred, you lie down for the whole day',
  summaryScreenTitle: 'My Movement Summary',
  summaryTitle: 'Summary',
  summarySupportMessage:
    'With the right support and treatment, your movement and mobility can improve.',
  summaryHelper:
    'This helps guide your treatment and support your recovery.',
  exploreTipsLabel: 'Explore tips on managing movement',
  resultsTitle: 'My results:',
  reflectionSummaryTitle: 'My reflections:',
  closeLabel: 'Close',
} as const;

export const generalMovementImpactOptions: readonly {
  id: GeneralMovementImpactId;
  label: string;
}[] = [
  {
    id: 'walk-slowly',
    label: 'I walk more slowly than usual because of my pain',
  },
  {
    id: 'rest-more-often',
    label: 'I lie down to rest more often because of my pain',
  },
  {
    id: 'stand-for-short-periods',
    label: 'I only stand up for short periods of time because of my pain',
  },
  {
    id: 'avoid-bending-or-kneeling',
    label: 'I try not to bend or kneel down because of my pain',
  },
  {
    id: 'difficulty-leaving-chair',
    label: 'I find it difficult to get out of a chair because of my pain',
  },
  {
    id: 'sit-most-of-day',
    label: 'I sit down most of the day because of my pain',
  },
];

export const movementImpactSections: Record<
  MovementImpactArea,
  {
    title: string;
    options: readonly { score: number; label: string }[];
  }
> = {
  walking: {
    title: 'Walking Impacts',
    options: [
      { score: 0, label: 'Pain does not prevent me walking any distance' },
      {
        score: 1,
        label: 'Pain prevents me from walking more than 2 kilometres',
      },
      {
        score: 2,
        label: 'Pain prevents me from walking more than 1 kilometre',
      },
      {
        score: 3,
        label: 'Pain prevents me from walking more than 500 metres',
      },
      { score: 4, label: 'I can only walk using a stick or crutches' },
      { score: 5, label: 'I am in bed most of the time' },
    ],
  },
  lifting: {
    title: 'Lifting Impacts',
    options: [
      { score: 0, label: 'I can lift heavy weights without extra pain' },
      {
        score: 1,
        label: 'I can lift heavy weights but it gives extra pain',
      },
      {
        score: 2,
        label:
          'I struggle to lift heavy weights off the floor, but I can lift them from a table.',
      },
      {
        score: 3,
        label:
          'I struggle to lift heavy weights off the floor, but I can lift medium weights on the table',
      },
      { score: 4, label: 'I can lift very light weights' },
      { score: 5, label: 'I cannot lift or carry anything at all' },
    ],
  },
  sitting: {
    title: 'Sitting Impacts',
    options: [
      { score: 0, label: 'I can sit in any chair as long as I like' },
      {
        score: 1,
        label: 'I can only sit in my favourite chair as long as I like',
      },
      { score: 2, label: 'Pain prevents me sitting more than one hour' },
      { score: 3, label: 'Pain prevents me sitting more than 30 minutes' },
      {
        score: 4,
        label: 'Pain prevents me from sitting more than 10 minutes',
      },
      { score: 5, label: 'Pain prevents me from sitting at all' },
    ],
  },
  standing: {
    title: 'Standing Impacts',
    options: [
      {
        score: 0,
        label: 'I can stand as long as I want without increased pain',
      },
      {
        score: 1,
        label: 'I can stand as long as I want but increased my pain',
      },
      { score: 2, label: 'Pain prevents me standing more than one hour' },
      {
        score: 3,
        label: 'Pain prevents me standing more than 30 minutes',
      },
      {
        score: 4,
        label: 'Pain prevents me from standing more than 10 minutes',
      },
      { score: 5, label: 'Pain prevents me from standing at all' },
    ],
  },
};

export const movementExerciseUrl = 'https://muscha.org/exercise';

export function getMovementImpactPhrase(score: number) {
  if (score <= 5) {
    return 'does not really impact';
  }

  if (score <= 10) {
    return 'mildly impacts';
  }

  if (score <= 15) {
    return 'moderately impacts';
  }

  return 'is significantly impacting';
}

import type {
  PainCharacteristicId,
  PainIntensityQuestionId,
  PainIntensityResponseKey,
  PainLocationId,
} from '@/features/pain-tracker/types/PainAssessment';

export const painLocationOptions: readonly {
  id: PainLocationId;
  label: string;
}[] = [
  { id: 'head', label: 'Head' },
  { id: 'neck', label: 'Neck' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'upper-back', label: 'Upper back' },
  { id: 'lower-back', label: 'Lower back' },
  { id: 'leg', label: 'Leg' },
  { id: 'hip', label: 'Hip' },
  { id: 'buttock', label: 'Buttock' },
  { id: 'knee', label: 'Knee' },
  { id: 'other', label: 'Other' },
];

export const painCharacteristicOptions: readonly {
  id: PainCharacteristicId;
  label: string;
}[] = [
  { id: 'aching', label: 'Aching' },
  { id: 'throbbing', label: 'Throbbing' },
  { id: 'shooting', label: 'Shooting' },
  { id: 'stabbing', label: 'Stabbing' },
  { id: 'gnawing', label: 'Gnawing' },
  { id: 'sharp', label: 'Sharp' },
  { id: 'tender', label: 'Tender' },
  { id: 'burning', label: 'Burning' },
  { id: 'exhausting', label: 'Exhausting' },
  { id: 'tiring', label: 'Tiring' },
  { id: 'penetrating', label: 'Penetrating' },
  { id: 'nagging', label: 'Nagging' },
];

type PainIntensityQuestion = {
  id: PainIntensityQuestionId;
  responseKey: PainIntensityResponseKey;
  step: number;
  prompt: string;
  usesPastTense: boolean;
};

export const painIntensityQuestions: Record<
  PainIntensityQuestionId,
  PainIntensityQuestion
> = {
  current: {
    id: 'current',
    responseKey: 'currentPain',
    step: 3,
    prompt: 'My current pain is',
    usesPastTense: false,
  },
  mildest: {
    id: 'mildest',
    responseKey: 'mildestPain',
    step: 4,
    prompt: 'My mildest pain last week was',
    usesPastTense: true,
  },
  worst: {
    id: 'worst',
    responseKey: 'worstPain',
    step: 5,
    prompt: 'My worst pain last week was',
    usesPastTense: true,
  },
  average: {
    id: 'average',
    responseKey: 'averagePain',
    step: 6,
    prompt: 'My average pain last week was',
    usesPastTense: true,
  },
};

export const painAssessmentCopy = {
  trackerTitle: 'Pain Tracker',
  assessmentTitle: 'My Pain',
  backLabel: '‹ Back',
  recordLabel: 'Record →',
  locationTitle: 'Pain location',
  locationPrompt: 'I have had pain in these areas last week.',
  locationHelper: 'Select all that apply. Scroll down for more options.',
  otherLocationTitle: 'Other pain location',
  otherLocationPlaceholder: 'Type a pain location',
  cancelLabel: 'Cancel',
  addLabel: 'Add',
  characteristicsTitle: 'Pain characteristics',
  characteristicsPrompt:
    'For each following word, check if that adjective applies to your pain.',
  characteristicsHelper:
    'Select all that apply. Scroll down for more options.',
  intensityTitle: 'Pain intensity',
  intensityRange: 'out of 10',
  summaryTitle: 'My Pain Summary',
  summaryIntro: 'This helps guide your treatment and support your recovery.',
  summarySessionNote: 'Available during this session',
  closeLabel: 'Close',
} as const;

export function getPainDescription(value: number, usesPastTense: boolean) {
  if (value === 0) {
    return usesPastTense ? 'I had no pain at all' : 'I have no pain at all';
  }

  const verb = usesPastTense ? 'was' : 'is';

  if (value <= 3) {
    return `The pain ${verb} very mild`;
  }

  if (value <= 6) {
    return `The pain ${verb} moderate`;
  }

  if (value <= 8) {
    return `The pain ${verb} fairly severe`;
  }

  if (value === 9) {
    return `The pain ${verb} extremely severe`;
  }

  return `The pain ${verb} the worst imaginable`;
}

export function findPainLocationLabel(locationId: PainLocationId) {
  return painLocationOptions.find((option) => option.id === locationId)?.label;
}

export function findPainCharacteristicLabel(
  characteristicId: PainCharacteristicId,
) {
  return painCharacteristicOptions.find(
    (option) => option.id === characteristicId,
  )?.label;
}

export function getPainSummaryDescription(
  responseKey: PainIntensityResponseKey,
  value: number,
) {
  const severity = value === 0
    ? 'no'
    : value <= 3
      ? 'mild'
      : value <= 6
        ? 'moderate'
        : value <= 8
          ? 'severe'
          : value === 9
            ? 'very severe'
            : 'the worst imaginable';

  if (responseKey === 'currentPain') {
    return value === 0
      ? 'I do not experience pain at the moment'
      : `I currently experience ${severity} pain`;
  }

  if (responseKey === 'worstPain') {
    return value === 0
      ? 'My worst pain was no pain at all'
      : `My worst pain was ${severity}`;
  }

  if (responseKey === 'averagePain' && value === 0) {
    return 'I had no pain on average';
  }

  return value === 0
    ? 'I had no pain at all'
    : `I have experienced ${severity} pain`;
}

export function getAssessmentPeriodLabel(today = new Date()) {
  const periodEnd = new Date(today);
  periodEnd.setDate(periodEnd.getDate() - 1);

  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - 6);

  const startDay = periodStart.getDate();
  const endDay = periodEnd.getDate();
  const startMonth = periodStart.toLocaleDateString('en-AU', {
    month: 'short',
  });
  const endMonth = periodEnd.toLocaleDateString('en-AU', {
    month: 'short',
  });

  if (startMonth === endMonth) {
    return `${startDay}-${endDay} ${endMonth}`;
  }

  return `${startDay} ${startMonth}-${endDay} ${endMonth}`;
}

import type {
  GeneralMoodOption,
  SocialHealthImpactArea,
  SocialHealthImpactScore,
  SocialHealthStatementOption,
} from '@/features/social-health-assessment/types/SocialHealthAssessment';

export const socialHealthAssessmentCopy = {
  trackerTitle: 'Pain Tracker',
  assessmentTitle: 'My Social Health',
  backLabel: 'Back',
  recordLabel: 'Record',

  socialLifeTitle: 'Social life',
  travellingTitle: 'Travelling',
  moodTitle: 'Mood',
  relationshipTitle: 'Relation with others',
  enjoymentTitle: 'Enjoyment of life',

  statementPrompt: 'Select the MOST relevant statement:',

  moodQuestion:
    'Over the past week, how much has pain impacted your mood?',

  relationshipQuestion:
    'Over the past week, how much has pain interfered with your relationships with other people?',

  enjoymentQuestion:
    'Over the past week, how much has pain impacted your ability to enjoy life?',

  generalMoodQuestion:
    'Over the past week, how was your mood generally?',

  generalMoodHelper:
    'Tap below emoji to describe your mood',

  reflectionQuestion:
    'What triggered that mood?',

  reflectionHelper:
    'i.e: delayed in work due to pain, inability to meet with friends, etc',
} as const;

export const socialLifeOptions: readonly SocialHealthStatementOption[] = [
  {
    score: 0,
    label: 'My social life is normal and gives me no extra pain',
  },
  {
    score: 1,
    label: 'My social life is normal but increases the degree of pain',
  },
  {
    score: 2,
    label:
      'Pain has no significant effect on my social life apart from limiting my more energetic interests eg, gym, sports',
  },
  {
    score: 3,
    label:
      'Pain has restricted my social life and I do not go out as often',
  },
  {
    score: 4,
    label: 'Pain has restricted my social life to my home',
  },
  {
    score: 5,
    label: 'I have no social life because of pain',
  },
];

export const travellingOptions: readonly SocialHealthStatementOption[] = [
  {
    score: 0,
    label: 'I can travel anywhere without pain',
  },
  {
    score: 1,
    label: 'I can travel anywhere but it gives me extra pain',
  },
  {
    score: 2,
    label: 'Pain is bad but I manage journeys over two hours',
  },
  {
    score: 3,
    label: 'Pain restricts me to journeys of less than one hour',
  },
  {
    score: 4,
    label:
      'Pain restricts me to short necessary journey under 30 minutes',
  },
  {
    score: 5,
    label:
      'Pain prevents me from travelling expect to receive treatment',
  },
];

export const generalMoodOptions: readonly GeneralMoodOption[] = [
  {
    id: 'frustrated',
    label: 'I was feeling frustrated',
  },
  {
    id: 'sad',
    label: 'I was feeling sad',
  },
  {
    id: 'okay',
    label: 'I was feeling okay',
  },
  {
    id: 'calm',
    label: 'I was feeling calm',
  },
  {
    id: 'delighted',
    label: 'I was feeling delighted',
  },
];

function getMoodImpactDescription(
  score: SocialHealthImpactScore,
) {
  if (score === 0) {
    return 'Pain does not impact my mood at all';
  }

  if (score <= 3) {
    return 'Pain slightly affects my mood';
  }

  if (score <= 6) {
    return 'Pain moderately affects my mood';
  }

  if (score <= 8) {
    return 'Pain substantially affects my mood';
  }

  if (score === 9) {
    return 'Pain extremely affects my mood';
  }

  return 'Pain completely impacts my mood';
}

function getRelationshipImpactDescription(
  score: SocialHealthImpactScore,
) {
  if (score === 0) {
    return 'Pain does not interfere my relationships with others';
  }

  if (score <= 3) {
    return 'Pain slightly interferes my relationships with others';
  }

  if (score <= 6) {
    return 'Pain moderately interferes my relationships with others';
  }

  if (score <= 8) {
    return 'Pain substantially interferes my relationships with others';
  }

  if (score === 9) {
    return 'Pain extremely interferes my relation with others';
  }

  return 'Pain completely interferes with my relationships with others';
}

function getEnjoymentImpactDescription(
  score: SocialHealthImpactScore,
) {
  if (score === 0) {
    return 'Pain does not impact my ability to enjoy life';
  }

  if (score <= 3) {
    return 'Pain slightly impacts my ability to enjoy life';
  }

  if (score <= 6) {
    return 'Pain moderately impacts my ability to enjoy life';
  }

  if (score <= 8) {
    return 'Pain substantially impacts my ability to enjoy life';
  }

  if (score === 9) {
    return 'Pain extremely impacts my ability to enjoy life';
  }

  return 'Pain completely prevents me from enjoying life';
}

export function getSocialHealthImpactDescription(
  area: SocialHealthImpactArea,
  score: SocialHealthImpactScore,
) {
  switch (area) {
    case 'moodImpact':
      return getMoodImpactDescription(score);

    case 'relationshipImpact':
      return getRelationshipImpactDescription(score);

    case 'enjoymentImpact':
      return getEnjoymentImpactDescription(score);
  }
}
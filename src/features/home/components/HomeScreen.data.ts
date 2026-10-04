export const homeAssessments = [
  {
    id: 'pain',
    label: 'Pain',
    description: 'Record your pain\nthis week.',
    icon: 'body-outline',
    backgroundColor: '#254A8B',
    color: '#FFFFFF',
  },
  {
    id: 'movement',
    label: 'Movement',
    description: 'Record your\nmovement this week.',
    icon: 'walk-outline',
    backgroundColor: '#DCE9FC',
    color: '#082D6D',
  },
  {
    id: 'personal-care',
    label: 'Personal care',
    description: 'Record your personal\ncare this week.',
    icon: 'account-heart-outline',
    backgroundColor: '#F9DECE',
    color: '#082D6D',
  },
  {
    id: 'social-health',
    label: 'Social health',
    description: 'Record your social\nhealth this week.',
    icon: 'people-outline',
    backgroundColor: '#DCE9FC',
    color: '#082D6D',
  },
  {
    id: 'management',
    label: 'Management',
    description: 'Record your management this week.',
    icon: 'settings-outline',
    backgroundColor: '#FFFFFF',
    color: '#082D6D',
  },
] as const;

export type HomeAssessmentId =
  (typeof homeAssessments)[number]['id'];

export const homeScreenCopy = {
  brand: 'MPowered',
  greetingPrefix: 'Good morning',
  heading: 'Make space\nfor you.',
  progressLabel: 'This week',
  recordLabel: 'Record',
  updatedLabel: 'Updated',
  reflectionLabel: 'Reflect on your week',
  supportedByLabel: 'Supported by ABBVIE',
} as const;

export type HomeAssessmentStatus = {
  completed: boolean;
  updatedAt?: string;
};

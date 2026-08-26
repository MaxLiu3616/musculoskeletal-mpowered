export type HomeSummaryType =
  | 'health-profile'
  | 'personalised-questions';

export type HomeSummaryItem = {
  type: HomeSummaryType;
  updatedAt?: string;
};

export const homeSummaryCopy = {
  healthProfile: {
    title: 'Your MPowered Health Profile has been created',
    actionLabel: 'Check my pain profile',
  },

  personalisedQuestions: {
    title:
      'Explore personalised questions informed by your answers.',
    actionLabel: 'Prepare for my appointment',
  },

  updatedLabel: 'Updated by',
} as const;
export type SocialHealthStatementScore =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5;

export type SocialHealthImpactScore =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;

export type SocialHealthImpactArea =
  | 'moodImpact'
  | 'relationshipImpact'
  | 'enjoymentImpact';

export type GeneralMoodId =
  | 'frustrated'
  | 'sad'
  | 'okay'
  | 'calm'
  | 'delighted';

export type SocialHealthStatementOption = {
  score: SocialHealthStatementScore;
  label: string;
};

export type GeneralMoodOption = {
  id: GeneralMoodId;
  label: string;
};

export type SocialHealthAssessmentResponses = {
  socialLife: SocialHealthStatementScore | null;
  travelling: SocialHealthStatementScore | null;
  moodImpact: SocialHealthImpactScore | null;
  relationshipImpact: SocialHealthImpactScore | null;
  enjoymentImpact: SocialHealthImpactScore | null;
  generalMood: GeneralMoodId | null;
  reflection: string;
};
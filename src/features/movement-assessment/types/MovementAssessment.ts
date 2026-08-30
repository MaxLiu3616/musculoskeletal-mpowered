export type GeneralMovementImpactId =
  | 'walk-slowly'
  | 'rest-more-often'
  | 'stand-for-short-periods'
  | 'avoid-bending-or-kneeling'
  | 'difficulty-leaving-chair'
  | 'sit-most-of-day';

export type MovementImpactArea =
  | 'walking'
  | 'lifting'
  | 'sitting'
  | 'standing';

export type MovementAssessmentResponses = {
  hoursActiveLastWeek: number | null;
  generalImpacts: GeneralMovementImpactId[];
  walking: number | null;
  lifting: number | null;
  sitting: number | null;
  standing: number | null;
  reflection: string | null;
};

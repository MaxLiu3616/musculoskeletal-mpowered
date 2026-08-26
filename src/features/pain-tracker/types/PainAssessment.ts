export type PainLocationId =
  | 'head'
  | 'neck'
  | 'shoulder'
  | 'upper-back'
  | 'lower-back'
  | 'leg'
  | 'hip'
  | 'buttock'
  | 'knee'
  | 'other';

export type PainCharacteristicId =
  | 'aching'
  | 'throbbing'
  | 'shooting'
  | 'stabbing'
  | 'gnawing'
  | 'sharp'
  | 'tender'
  | 'burning'
  | 'exhausting'
  | 'tiring'
  | 'penetrating'
  | 'nagging';

export type PainIntensityResponseKey =
  | 'currentPain'
  | 'mildestPain'
  | 'worstPain'
  | 'averagePain';

export type PainIntensityQuestionId =
  | 'current'
  | 'mildest'
  | 'worst'
  | 'average';

export type PainAssessmentResponses = {
  locations: PainLocationId[];
  otherLocation: string;
  characteristics: PainCharacteristicId[];
  currentPain: number | null;
  mildestPain: number | null;
  worstPain: number | null;
  averagePain: number | null;
};

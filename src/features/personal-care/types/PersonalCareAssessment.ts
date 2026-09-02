export type GeneralActivityImpactId =
    | 'houseJobs'
    | 'dressingSlower'
    | 'sleepingWorse'
    | 'irritable'
    | 'delegating';

export type PersonalCareOptionId =
    | 'normal'
    | 'normalButPainful'
    | 'painfulSlow'
    | 'needSomeHelp'
    | 'needHelpDaily'
    | 'doNotGetDressed';

export type SleepOptionId =
    | 'neverDisturbed'
    | 'occasionallyDisturbed'
    | 'lessThan6Hours'
    | 'lessThan4Hours'
    | 'lessThan2Hours'
    | 'painPreventsSleep';

export type PersonalCareAssessmentResponses = {
    generalActivityImpacts: GeneralActivityImpactId[];
    personalCare: PersonalCareOptionId | null;
    sleep: SleepOptionId | null;
    reflection: string;
};
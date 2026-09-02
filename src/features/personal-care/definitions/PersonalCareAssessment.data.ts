import type {
    GeneralActivityImpactId,
    PersonalCareOptionId,
    SleepOptionId,
} from '@/features/personal-care/types/PersonalCareAssessment';

export const personalCareAssessmentCopy = {
    backLabel: '← Back',
    trackerTitle: 'Pain Tracker',
    assessmentTitle: 'My Personal Care',
    recordLabel: 'Record →',
    closeLabel: 'Close',

    generalActivitiesTitle: 'General Activities Impacts',
    generalActivitiesPrompt: 'Select ALL relevant statements:',

    personalCareTitle: 'Personal care.tsx (washing, dressing, etc)',
    personalCarePrompt: 'Select the MOST relevant statement:',

    sleepingTitle: 'Sleeping',
    sleepingPrompt: 'Select the MOST relevant statement:',

    reflectionTitle: 'Reflection on your personal care',
    reflectionPrompt: 'Write any reflections of pain impacts on your daily life/',
    reflectionPlaceholder:
        'For instance, this week, I felt that I could not everything at all, I felt hopeless, even doing the laundry felt miserable',

    summaryTitle: 'My Personal Care',
    summaryIntro: 'This helps guide your treatment and support your recovery.',
    summarySessionNote: 'Saved to Care Journal',
};

export const generalActivityImpactOptions: {
    id: GeneralActivityImpactId;
    label: string;
}[] = [
    { id: 'houseJobs', label: 'I am not doing any jobs that I usually do around the house' },
    { id: 'dressingSlower', label: 'I get dressed more slowly than usual because of my pain' },
    { id: 'sleepingWorse', label: 'I sleep less well because of my pain' },
    { id: 'irritable', label: 'I am more irritable and bad tempered with people than usual' },
    { id: 'delegating', label: 'I try to get other people to do things for me because of my pain' },
];

export const personalCareOptions: {
    id: PersonalCareOptionId;
    label: string;
    score: number;
}[] = [
    { id: 'normal', label: 'I can look after myself normally without causing extra pain', score: 0 },
    { id: 'normalButPainful', label: 'I can look after myself normally but it causes extra pain', score: 1 },
    { id: 'painfulSlow', label: 'It is painful to look after myself and I am slow and careful', score: 2 },
    { id: 'needSomeHelp', label: 'I need some help but manage most of my personal care', score: 3 },
    { id: 'needHelpDaily', label: 'I need help everyday in most aspects of self-care', score: 4 },
    { id: 'doNotGetDressed', label: 'I do not get dressed, I wash with difficulty and stay in bed', score: 5 },
];

export const sleepOptions: {
    id: SleepOptionId;
    label: string;
    score: number;
}[] = [
    { id: 'neverDisturbed', label: 'My sleep is never disturbed by pain', score: 0 },
    { id: 'occasionallyDisturbed', label: 'My sleep is occasionally disturbed by pain', score: 1 },
    { id: 'lessThan6Hours', label: 'Because of pain I have less than 6 hours of sleep', score: 2 },
    { id: 'lessThan4Hours', label: 'Because of pain I have less than 4 hours of sleep', score: 3 },
    { id: 'lessThan2Hours', label: 'Because of pain I have less than 2 hours of sleep', score: 4 },
    { id: 'painPreventsSleep', label: 'Pain prevents me from sleeping at all', score: 5 },
];

export function findPersonalCareLabel(id: PersonalCareOptionId): string | undefined {
    return personalCareOptions.find((option) => option.id === id)?.label;
}

export function findSleepLabel(id: SleepOptionId): string | undefined {
    return sleepOptions.find((option) => option.id === id)?.label;
}

export function findGeneralActivityLabel(
    id: GeneralActivityImpactId,
): string | undefined {
    return generalActivityImpactOptions.find((option) => option.id === id)
        ?.label;
}

export function getPersonalCareTotalScore(
    generalActivityImpacts: GeneralActivityImpactId[],
    personalCare: PersonalCareOptionId | null,
    sleep: SleepOptionId | null,
): number {
    const generalScore = generalActivityImpacts.length;
    const personalCareScore =
        personalCareOptions.find((option) => option.id === personalCare)?.score ?? 0;
    const sleepScore =
        sleepOptions.find((option) => option.id === sleep)?.score ?? 0;

    return generalScore + personalCareScore + sleepScore;
}

export type PersonalCareSummaryDescription = {
    firstLine: string;
    boldPhrase: string;
    secondLine: string;
};

export function getPersonalCareSummaryDescription(
    totalScore: number,
): PersonalCareSummaryDescription {
    if (totalScore <= 3) {
        return {
            firstLine: 'Pain does not really',
            boldPhrase: 'impact',
            secondLine: 'your personal care.',
        };
    }
    if (totalScore <= 5) {
        return {
            firstLine: 'Pain',
            boldPhrase: 'mildly impacts',
            secondLine: 'your personal care.',
        };
    }
    if (totalScore <= 10) {
        return {
            firstLine: 'Pain',
            boldPhrase: 'moderately impacts',
            secondLine: 'your personal care.',
        };
    }
    return {
        firstLine: 'Pain is currently having a',
        boldPhrase: 'significant impact',
        secondLine:
            'on your personal care. With the right care and guidance, these tasks can become more manageable over time.',
    };
}

export function getAssessmentPeriodLabel(): string {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 6);

    const format = (date: Date) =>
        date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });

    return `${format(start)} - ${format(today)}`;
}
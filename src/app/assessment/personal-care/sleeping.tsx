import * as React from 'react';
import { Redirect, router } from 'expo-router';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import PersonalCareSleepingScreen from '@/features/personal-care/components/PersonalCareSleepingScreen';

export default function PersonalCareSleepingRoute() {
    const { responses } = usePersonalCareAssessment();

    if (responses.personalCare === null) {
        return <Redirect href="/assessment/personal-care/care" />;
    }

    return (
        <PersonalCareSleepingScreen
            onBack={() => router.back()}
            onContinue={() => router.push('/assessment/personal-care/reflection')}
        />
    );
}
import * as React from 'react';
import { Redirect, router } from 'expo-router';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import PersonalCareReflectionScreen from '@/features/personal-care/components/PersonalCareReflectionScreen';

export default function PersonalCareReflectionRoute() {
    const { responses } = usePersonalCareAssessment();

    if (responses.sleep === null) {
        return <Redirect href="/assessment/personal-care/sleeping" />;
    }

    return (
        <PersonalCareReflectionScreen
            onBack={() => router.back()}
            onContinue={() => router.push('/assessment/personal-care/summary')}
        />
    );
}
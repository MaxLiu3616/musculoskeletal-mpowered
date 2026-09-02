import * as React from 'react';
import { Stack } from 'expo-router';

import { PersonalCareAssessmentProvider } from '@/features/personal-care/PersonalCareAssessmentContext';

export default function PersonalCareAssessmentLayout() {
    return (
        <PersonalCareAssessmentProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </PersonalCareAssessmentProvider>
    );
}
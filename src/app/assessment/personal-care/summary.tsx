import * as React from 'react';
import { router } from 'expo-router';

import PersonalCareSummaryScreen from '@/features/personal-care/components/PersonalCareSummaryScreen';

export default function PersonalCareSummaryRoute() {
    const closeAssessment = () => {
        router.dismissTo('/home');
    };

    return (
        <PersonalCareSummaryScreen
            onBack={() => router.back()}
            onClose={closeAssessment}
        />
    );
}
import * as React from 'react';
import { router } from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import PersonalCareSummaryScreen from '@/features/personal-care/components/PersonalCareSummaryScreen';

export default function PersonalCareSummaryRoute() {
    const { markAssessmentComplete } = useHomeAssessment();

    const closeAssessment = () => {
        markAssessmentComplete('personal-care');
        router.dismissTo('/home');
    };

    return (
        <PersonalCareSummaryScreen
            onBack={() => router.back()}
            onClose={closeAssessment}
        />
    );
}
import * as React from 'react';
import { router } from 'expo-router';

import PersonalCareGeneralImpactsScreen from '@/features/personal-care/components/PersonalCareGeneralImpactsScreen';

export default function PersonalCareGeneralImpactsRoute() {
    return (
        <PersonalCareGeneralImpactsScreen
            onBack={() => router.back()}
            onContinue={() => router.push('/assessment/personal-care/care')}
        />
    );
}
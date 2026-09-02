import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import type {
    GeneralActivityImpactId,
    PersonalCareAssessmentResponses,
    PersonalCareOptionId,
    SleepOptionId,
} from '@/features/personal-care/types/PersonalCareAssessment';

const initialResponses: PersonalCareAssessmentResponses = {
    generalActivityImpacts: [],
    personalCare: null,
    sleep: null,
    reflection: '',
};

type PersonalCareAssessmentContextValue = {
    responses: PersonalCareAssessmentResponses;
    updateGeneralActivityImpacts: (values: GeneralActivityImpactId[]) => void;
    updatePersonalCare: (value: PersonalCareOptionId) => void;
    updateSleep: (value: SleepOptionId) => void;
    updateReflection: (value: string) => void;
    resetResponses: () => void;
};

const PersonalCareAssessmentContext = createContext<PersonalCareAssessmentContextValue | undefined>(undefined);

export function PersonalCareAssessmentProvider({ children }: { children: ReactNode }) {
    const [responses, setResponses] = useState<PersonalCareAssessmentResponses>(initialResponses);

    const updateGeneralActivityImpacts = (values: GeneralActivityImpactId[]) => {
        setResponses((current) => ({ ...current, generalActivityImpacts: values }));
    };

    const updatePersonalCare = (value: PersonalCareOptionId) => {
        setResponses((current) => ({ ...current, personalCare: value }));
    };

    const updateSleep = (value: SleepOptionId) => {
        setResponses((current) => ({ ...current, sleep: value }));
    };

    const updateReflection = (value: string) => {
        setResponses((current) => ({ ...current, reflection: value }));
    };

    const resetResponses = () => {
        setResponses(initialResponses);
    };

    return (
        <PersonalCareAssessmentContext.Provider
            value={{
                responses,
                updateGeneralActivityImpacts,
                updatePersonalCare,
                updateSleep,
                updateReflection,
                resetResponses,
            }}
        >
            {children}
        </PersonalCareAssessmentContext.Provider>
    );
}

export function usePersonalCareAssessment() {
    const context = useContext(PersonalCareAssessmentContext);
    if (!context) {
        throw new Error('usePersonalCareAssessment must be used within a PersonalCareAssessmentProvider');
    }
    return context;
}
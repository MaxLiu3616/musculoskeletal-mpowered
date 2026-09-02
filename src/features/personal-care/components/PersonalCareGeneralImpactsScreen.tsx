import * as React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import {
    generalActivityImpactOptions,
    personalCareAssessmentCopy,
} from '@/features/personal-care/definitions/PersonalCareAssessment.data';
import type { GeneralActivityImpactId } from '@/features/personal-care/types/PersonalCareAssessment';

import PersonalCareAssessmentScreen from './PersonalCareAssessmentScreen';
import { styles } from './PersonalCareAssessmentScreen.styles';
import PersonalCareOptionList from './PersonalCareOptionList';

type PersonalCareGeneralImpactsScreenProps = {
    onBack: () => void;
    onContinue: () => void;
};

export default function PersonalCareGeneralImpactsScreen({
                                                             onBack,
                                                             onContinue,
                                                         }: PersonalCareGeneralImpactsScreenProps) {
    const { responses, updateGeneralActivityImpacts } =
        usePersonalCareAssessment();
    const [selected, setSelected] = useState<GeneralActivityImpactId[]>(
        responses.generalActivityImpacts,
    );
    const canRecord = selected.length > 0;

    const toggle = (id: GeneralActivityImpactId) => {
        setSelected((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const record = () => {
        if (!canRecord) {
            return;
        }
        updateGeneralActivityImpacts(selected);
        onContinue();
    };

    return (
        <PersonalCareAssessmentScreen
            canRecord={canRecord}
            onBack={onBack}
            onRecord={record}
            sectionTitle={personalCareAssessmentCopy.generalActivitiesTitle}
            step={1}
        >
            <Text style={styles.prompt}>
                Select <Text style={styles.promptUnderline}>ALL</Text> relevant statements:
            </Text>

            <PersonalCareOptionList
                multiSelect
                onToggle={toggle}
                options={generalActivityImpactOptions}
                selectedIds={selected}
            />
        </PersonalCareAssessmentScreen>
    );
}
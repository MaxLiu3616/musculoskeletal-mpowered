import * as React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import {
    personalCareAssessmentCopy,
    personalCareOptions,
} from '@/features/personal-care/definitions/PersonalCareAssessment.data';
import type { PersonalCareOptionId } from '@/features/personal-care/types/PersonalCareAssessment';

import PersonalCareAssessmentScreen from './PersonalCareAssessmentScreen';
import { styles } from './PersonalCareAssessmentScreen.styles';
import PersonalCareOptionList from './PersonalCareOptionList';

type PersonalCareWashingDressingScreenProps = {
    onBack: () => void;
    onContinue: () => void;
};

export default function PersonalCareWashingDressingScreen({
                                                              onBack,
                                                              onContinue,
                                                          }: PersonalCareWashingDressingScreenProps) {
    const { responses, updatePersonalCare } = usePersonalCareAssessment();
    const [selected, setSelected] = useState<PersonalCareOptionId | null>(
        responses.personalCare,
    );
    const canRecord = selected !== null;

    const select = (id: PersonalCareOptionId) => {
        setSelected(id);
    };

    const record = () => {
        if (!selected) {
            return;
        }
        updatePersonalCare(selected);
        onContinue();
    };

    return (
        <PersonalCareAssessmentScreen
            canRecord={canRecord}
            onBack={onBack}
            onRecord={record}
            sectionTitle={personalCareAssessmentCopy.personalCareTitle}
            step={2}
        >
            <Text style={styles.prompt}>
                Select the <Text style={styles.promptUnderline}>MOST</Text> relevant statement:
            </Text>

            <PersonalCareOptionList
                onToggle={select}
                options={personalCareOptions}
                selectedIds={selected ? [selected] : []}
            />
        </PersonalCareAssessmentScreen>
    );
}
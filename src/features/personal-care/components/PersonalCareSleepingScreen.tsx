import * as React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import {
    personalCareAssessmentCopy,
    sleepOptions,
} from '@/features/personal-care/definitions/PersonalCareAssessment.data';
import type { SleepOptionId } from '@/features/personal-care/types/PersonalCareAssessment';

import PersonalCareAssessmentScreen from './PersonalCareAssessmentScreen';
import { styles } from './PersonalCareAssessmentScreen.styles';
import PersonalCareOptionList from './PersonalCareOptionList';

type PersonalCareSleepingScreenProps = {
    onBack: () => void;
    onContinue: () => void;
};

export default function PersonalCareSleepingScreen({
                                                       onBack,
                                                       onContinue,
                                                   }: PersonalCareSleepingScreenProps) {
    const { responses, updateSleep } = usePersonalCareAssessment();
    const [selected, setSelected] = useState<SleepOptionId | null>(
        responses.sleep,
    );
    const canRecord = selected !== null;

    const select = (id: SleepOptionId) => {
        setSelected(id);
    };

    const record = () => {
        if (!selected) {
            return;
        }
        updateSleep(selected);
        onContinue();
    };

    return (
        <PersonalCareAssessmentScreen
            canRecord={canRecord}
            onBack={onBack}
            onRecord={record}
            sectionTitle={personalCareAssessmentCopy.sleepingTitle}
            step={3}
        >
            <Text style={styles.prompt}>
                Select the <Text style={styles.promptUnderline}>MOST</Text> relevant statement:
            </Text>

            <PersonalCareOptionList
                onToggle={select}
                options={sleepOptions}
                selectedIds={selected ? [selected] : []}
            />
        </PersonalCareAssessmentScreen>
    );
}
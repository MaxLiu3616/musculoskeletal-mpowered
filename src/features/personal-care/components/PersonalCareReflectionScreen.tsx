import * as React from 'react';
import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import { personalCareAssessmentCopy } from '@/features/personal-care/definitions/PersonalCareAssessment.data';

import PersonalCareAssessmentScreen from './PersonalCareAssessmentScreen';
import { styles } from './PersonalCareAssessmentScreen.styles';

type PersonalCareReflectionScreenProps = {
    onBack: () => void;
    onContinue: () => void;
};

export default function PersonalCareReflectionScreen({
                                                         onBack,
                                                         onContinue,
                                                     }: PersonalCareReflectionScreenProps) {
    const { responses, updateReflection } = usePersonalCareAssessment();
    const [text, setText] = useState(responses.reflection);

    const record = () => {
        updateReflection(text);
        onContinue();
    };

    return (
        <PersonalCareAssessmentScreen
            canRecord
            onBack={onBack}
            onRecord={record}
            sectionTitle={personalCareAssessmentCopy.reflectionTitle}
            step={4}
        >
            <Text style={styles.prompt}>
                {personalCareAssessmentCopy.reflectionPrompt}
            </Text>

            <TextInput
                multiline
                onChangeText={setText}
                placeholder={personalCareAssessmentCopy.reflectionPlaceholder}
                placeholderTextColor="#9A95A0"
                style={styles.modalInput}
                value={text}
            />
        </PersonalCareAssessmentScreen>
    );
}
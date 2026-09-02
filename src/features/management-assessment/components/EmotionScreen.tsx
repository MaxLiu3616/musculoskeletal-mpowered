import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import { managementAssessmentCopy } from '@/features/management-assessment/definitions/ManagementAssessment.data';

import ManagementAssessmentScreen from './ManagementAssessmentScreen';
import { styles } from './ManagementAssessmentScreen.styles';

type EmotionScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function EmotionScreen({
  onBack,
  onContinue,
}: EmotionScreenProps) {
  const { responses, updateEmotionStrategy } = useManagementAssessment();
  const [strategy, setStrategy] = useState(responses.emotionStrategy);

  const recordStrategy = () => {
    updateEmotionStrategy(strategy.trim());
    onContinue();
  };

  return (
    <ManagementAssessmentScreen
      canRecord
      onBack={onBack}
      onRecord={recordStrategy}
      sectionTitle={managementAssessmentCopy.emotionTitle}
      step={4}
    >
      <Text style={styles.prompt}>
        {managementAssessmentCopy.emotionPrompt}
      </Text>
      <Text style={styles.helper}>
        {managementAssessmentCopy.emotionHelper}
      </Text>

      <TextInput
        accessibilityLabel="Emotional wellbeing strategy"
        maxLength={500}
        multiline
        onChangeText={setStrategy}
        placeholder={managementAssessmentCopy.emotionPlaceholder}
        placeholderTextColor="#7A747D"
        selectionColor="#6D50AC"
        style={styles.textArea}
        value={strategy}
      />
    </ManagementAssessmentScreen>
  );
}

import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import { movementAssessmentCopy } from '@/features/movement-assessment/definitions/MovementAssessment.data';

import MovementAssessmentScreen from './MovementAssessmentScreen';
import { styles } from './MovementReflectionScreen.styles';

type MovementReflectionScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function MovementReflectionScreen({
  onBack,
  onContinue,
}: MovementReflectionScreenProps) {
  const { responses, updateReflection } = useMovementAssessment();
  const [reflection, setReflection] = useState(responses.reflection ?? '');

  const recordReflection = () => {
    updateReflection(reflection.trim());
    onContinue();
  };

  return (
    <MovementAssessmentScreen
      canRecord
      onBack={onBack}
      onRecord={recordReflection}
      sectionTitle={movementAssessmentCopy.reflectionTitle}
      step={7}
      totalSteps={7}
    >
      <Text style={styles.question}>
        {movementAssessmentCopy.reflectionQuestion}
      </Text>
      <TextInput
        accessibilityLabel={movementAssessmentCopy.reflectionQuestion}
        multiline
        onChangeText={setReflection}
        placeholder={movementAssessmentCopy.reflectionPlaceholder}
        placeholderTextColor="#7A747D"
        style={styles.input}
        value={reflection}
      />
    </MovementAssessmentScreen>
  );
}

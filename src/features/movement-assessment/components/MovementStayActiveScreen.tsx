import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import { movementAssessmentCopy } from '@/features/movement-assessment/definitions/MovementAssessment.data';

import MovementAssessmentScreen from './MovementAssessmentScreen';
import { styles } from './MovementStayActiveScreen.styles';

type MovementStayActiveScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function MovementStayActiveScreen({
  onBack,
  onContinue,
}: MovementStayActiveScreenProps) {
  const { responses, updateHoursActiveLastWeek } = useMovementAssessment();
  const [hoursActive, setHoursActive] = useState(
    responses.hoursActiveLastWeek?.toString() ?? '',
  );

  const canRecord =
    hoursActive.trim().length > 0 && !isNaN(Number(hoursActive));

  const handleChangeText = (text: string) => {
    const numericOnly = text.replace(/[^0-9]/g, '');
    setHoursActive(numericOnly);
  };

  const recordHoursActive = () => {
    if (!canRecord) {
      return;
    }

    updateHoursActiveLastWeek(Number(hoursActive));
    onContinue();
  };

  return (
    <MovementAssessmentScreen
      canRecord={canRecord}
      onBack={onBack}
      onRecord={recordHoursActive}
      sectionTitle={movementAssessmentCopy.generalImpactsTitle}
      step={1}
      totalSteps={7}
    >
      <Text style={styles.question}>
        {movementAssessmentCopy.generalImpactsQuestion}
      </Text>

      <TextInput
        keyboardType="numeric"
        onChangeText={handleChangeText}
        placeholder={movementAssessmentCopy.generalImpactsPlaceholder}
        placeholderTextColor="#7A747D"
        style={styles.input}
        value={hoursActive}
      />

      <Text style={styles.helperText}>
        {movementAssessmentCopy.generalImpactsHelper}
      </Text>
    </MovementAssessmentScreen>
  );
}
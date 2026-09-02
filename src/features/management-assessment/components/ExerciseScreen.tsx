import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import {
  exerciseFrequencyOptions,
  managementAssessmentCopy,
} from '@/features/management-assessment/definitions/ManagementAssessment.data';
import type { ExerciseFrequencyId } from '@/features/management-assessment/types/ManagementAssessment';

import ManagementAssessmentScreen from './ManagementAssessmentScreen';
import { styles } from './ManagementAssessmentScreen.styles';

type ExerciseScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function ExerciseScreen({
  onBack,
  onContinue,
}: ExerciseScreenProps) {
  const { responses, updateExerciseFrequency } = useManagementAssessment();
  const [frequency, setFrequency] = useState<ExerciseFrequencyId | null>(
    responses.exerciseFrequency,
  );

  const recordFrequency = () => {
    if (!frequency) {
      return;
    }

    updateExerciseFrequency(frequency);
    onContinue();
  };

  return (
    <ManagementAssessmentScreen
      canRecord={frequency !== null}
      onBack={onBack}
      onRecord={recordFrequency}
      sectionTitle={managementAssessmentCopy.exerciseTitle}
      step={3}
    >
      <Text style={styles.prompt}>
        {managementAssessmentCopy.exercisePrompt}
      </Text>
      <Text style={styles.helper}>
        {managementAssessmentCopy.exerciseHelper}
      </Text>

      <View style={styles.choiceList}>
        {exerciseFrequencyOptions.map((option) => {
          const isSelected = frequency === option.id;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              key={option.id}
              onPress={() => setFrequency(option.id)}
              style={({ pressed }) => [
                styles.choiceOption,
                pressed && styles.optionPressed,
              ]}
            >
              <View
                accessible={false}
                style={[styles.radio, isSelected && styles.radioSelected]}
              >
                {isSelected ? <View style={styles.radioDot} /> : null}
              </View>
              <Text style={styles.choiceLabel}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ManagementAssessmentScreen>
  );
}

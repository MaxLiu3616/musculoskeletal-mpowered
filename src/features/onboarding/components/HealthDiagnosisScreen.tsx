import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  diagnosisOptions,
  healthDiagnosisScreenCopy,
  type DiagnosisOptionId,
} from './HealthConditionsScreen.data';
import { styles } from './HealthConditionsScreen.styles';

type HealthDiagnosisScreenProps = {
  onContinue: () => void;
};

export default function HealthDiagnosisScreen({
  onContinue,
}: HealthDiagnosisScreenProps) {
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<DiagnosisOptionId | null>(null);
  const canContinue = selectedDiagnosis !== null;

  const continueToConditionSelection = () => {
    if (!canContinue) {
      return;
    }

    onContinue();
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{healthDiagnosisScreenCopy.title}</Text>

      <View accessibilityRole="radiogroup" style={styles.diagnosisOptions}>
        {diagnosisOptions.map((option) => {
          const isSelected = selectedDiagnosis === option.id;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              key={option.id}
              onPress={() => setSelectedDiagnosis(option.id)}
              style={({ pressed }) => [
                styles.diagnosisOption,
                isSelected && styles.diagnosisOptionSelected,
                pressed && styles.optionPressed,
              ]}
            >
              <Text
                style={[
                  styles.diagnosisOptionText,
                  isSelected && styles.diagnosisOptionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.information}>
        {healthDiagnosisScreenCopy.information}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={continueToConditionSelection}
        style={({ pressed }) => [
          styles.primaryButton,
          !canContinue && styles.primaryButtonDisabled,
          pressed && canContinue && styles.primaryButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.primaryButtonText,
            !canContinue && styles.primaryButtonTextDisabled,
          ]}
        >
          {healthDiagnosisScreenCopy.continueLabel}
        </Text>
      </Pressable>
    </View>
  );
}

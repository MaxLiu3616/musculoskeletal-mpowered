import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import {
  movementAssessmentCopy,
  movementImpactSections,
} from '@/features/movement-assessment/definitions/MovementAssessment.data';
import type { MovementImpactArea } from '@/features/movement-assessment/types/MovementAssessment';

import MovementAssessmentScreen from './MovementAssessmentScreen';
import { styles } from './MovementOptionsScreen.styles';

type MovementImpactScreenProps = {
  area: MovementImpactArea;
  onBack: () => void;
  onContinue: () => void;
  step: number;
};

export default function MovementImpactScreen({
  area,
  onBack,
  onContinue,
  step,
}: MovementImpactScreenProps) {
  const { responses, updateImpact } = useMovementAssessment();
  const [selectedScore, setSelectedScore] = useState<number | null>(
    responses[area],
  );
  const section = movementImpactSections[area];
  const canRecord = selectedScore !== null;

  const recordImpact = () => {
    if (selectedScore === null) {
      return;
    }

    updateImpact(area, selectedScore);
    onContinue();
  };

  return (
    <MovementAssessmentScreen
      canRecord={canRecord}
      onBack={onBack}
      onRecord={recordImpact}
      sectionTitle={section.title}
      step={step}
      totalSteps={7}
    >
      <Text style={styles.instruction}>
        {movementAssessmentCopy.selectMostPrompt}
      </Text>
      <View style={styles.optionList}>
        {section.options.map((option, index) => {
          const isSelected = selectedScore === option.score;

          return (
            <Pressable
              aria-checked={isSelected}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              key={option.score}
              onPress={() => setSelectedScore(option.score)}
              style={({ pressed }) => [
                styles.optionRow,
                index === section.options.length - 1 && styles.optionRowLast,
                isSelected && styles.optionRowSelected,
                pressed && styles.optionRowPressed,
              ]}
            >
              <View
                style={[
                  styles.selectionControl,
                  styles.radio,
                  isSelected && styles.selectionControlSelected,
                ]}
              >
                {isSelected && <View style={styles.radioDot} />}
              </View>
              <Text style={[styles.optionText, styles.optionTextAfterControl]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </MovementAssessmentScreen>
  );
}

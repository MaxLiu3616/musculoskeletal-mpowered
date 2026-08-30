import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import {
  generalMovementImpactOptions,
  movementAssessmentCopy,
} from '@/features/movement-assessment/definitions/MovementAssessment.data';
import type { GeneralMovementImpactId } from '@/features/movement-assessment/types/MovementAssessment';

import MovementAssessmentScreen from './MovementAssessmentScreen';
import { styles } from './MovementOptionsScreen.styles';

type MovementGeneralImpactsScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function MovementGeneralImpactsScreen({
  onBack,
  onContinue,
}: MovementGeneralImpactsScreenProps) {
  const { responses, updateGeneralImpacts } = useMovementAssessment();
  const [selectedImpacts, setSelectedImpacts] = useState<
    GeneralMovementImpactId[]
  >(responses.generalImpacts);
  const canRecord = selectedImpacts.length > 0;

  const toggleImpact = (impact: GeneralMovementImpactId) => {
    setSelectedImpacts((currentImpacts) =>
      currentImpacts.includes(impact)
        ? currentImpacts.filter((value) => value !== impact)
        : [...currentImpacts, impact],
    );
  };

  const recordImpacts = () => {
    if (!canRecord) {
      return;
    }

    updateGeneralImpacts(selectedImpacts);
    onContinue();
  };

  return (
    <MovementAssessmentScreen
      canRecord={canRecord}
      onBack={onBack}
      onRecord={recordImpacts}
      sectionTitle={movementAssessmentCopy.generalImpactsTitle}
      step={2}
      totalSteps={7}
    >
      <Text style={styles.instruction}>
        {movementAssessmentCopy.selectAllPrompt}
      </Text>
      <View style={styles.optionList}>
        {generalMovementImpactOptions.map((option, index) => {
          const isSelected = selectedImpacts.includes(option.id);

          return (
            <Pressable
              aria-checked={isSelected}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              key={option.id}
              onPress={() => toggleImpact(option.id)}
              style={({ pressed }) => [
                styles.optionRow,
                index === generalMovementImpactOptions.length - 1 &&
                  styles.optionRowLast,
                isSelected && styles.optionRowSelected,
                pressed && styles.optionRowPressed,
              ]}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              <View
                style={[
                  styles.selectionControl,
                  styles.checkbox,
                  isSelected && styles.selectionControlSelected,
                ]}
              >
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </Pressable>
          );
        })}
      </View>
    </MovementAssessmentScreen>
  );
}

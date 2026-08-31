import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import {
  managementAssessmentCopy,
  managementMedicationOptions,
} from '@/features/management-assessment/definitions/ManagementAssessment.data';
import type { ManagementMedicationId } from '@/features/management-assessment/types/ManagementAssessment';

import ManagementAssessmentScreen from './ManagementAssessmentScreen';
import { styles } from './ManagementAssessmentScreen.styles';

type MedicationScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function MedicationScreen({
  onBack,
  onContinue,
}: MedicationScreenProps) {
  const { responses, updateMedications } = useManagementAssessment();
  const [selectedMedications, setSelectedMedications] = useState<
    ManagementMedicationId[]
  >(responses.medications);

  const toggleMedication = (medicationId: ManagementMedicationId) => {
    setSelectedMedications((currentSelection) =>
      currentSelection.includes(medicationId)
        ? currentSelection.filter((id) => id !== medicationId)
        : [...currentSelection, medicationId],
    );
  };

  const recordMedications = () => {
    updateMedications(selectedMedications);
    onContinue();
  };

  return (
    <ManagementAssessmentScreen
      canRecord
      onBack={onBack}
      onRecord={recordMedications}
      sectionTitle={managementAssessmentCopy.medicationTitle}
      step={1}
    >
      <Text style={styles.prompt}>
        {managementAssessmentCopy.medicationPrompt}
      </Text>
      <Text style={styles.helper}>
        {managementAssessmentCopy.medicationHelper}
      </Text>
      <Text style={styles.sourceLabel}>
        {managementAssessmentCopy.medicationSource}
      </Text>

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator
        style={styles.medicationList}
      >
        {managementMedicationOptions.map((medication) => {
          const isSelected = selectedMedications.includes(medication.id);

          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              key={medication.id}
              onPress={() => toggleMedication(medication.id)}
              style={({ pressed }) => [
                styles.medicationOption,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.medicationTextGroup}>
                <Text style={styles.medicationName}>{medication.name}</Text>
                <Text style={styles.medicationSchedule}>
                  {medication.schedule}
                </Text>
              </View>

              <View
                accessible={false}
                style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}
              >
                {isSelected ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </ManagementAssessmentScreen>
  );
}

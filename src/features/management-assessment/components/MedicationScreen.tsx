import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { prescriptionName, prescriptionSchedule } from '@/features/my-health/MyHealth.data';
import {
  managementAssessmentCopy,
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
  const { prescriptions } = useMyHealth();
  const [selectedMedications, setSelectedMedications] = useState<
    ManagementMedicationId[]
  >(responses.medications.filter((id) => prescriptions.some((item) => item.id === id)));

  const toggleMedication = (medicationId: ManagementMedicationId) => {
    setSelectedMedications((currentSelection) =>
      currentSelection.includes(medicationId)
        ? currentSelection.filter((id) => id !== medicationId)
        : [...currentSelection, medicationId],
    );
  };

  const recordMedications = () => {
    const selected = prescriptions.filter((item) => selectedMedications.includes(item.id));
    updateMedications(selected.map((item) => item.id), selected.map(prescriptionName));
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
        {prescriptions.length === 0 ? <Text style={styles.helper}>Your prescriptions list is empty. Add prescriptions in My Health, or continue without selecting medication.</Text> : null}
        {prescriptions.map((medication) => {
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
                <Text style={styles.medicationName}>{prescriptionName(medication)}</Text>
                <Text style={styles.medicationSchedule}>
                  {prescriptionSchedule(medication)}
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

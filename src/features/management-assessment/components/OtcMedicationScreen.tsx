import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import { managementAssessmentCopy } from '@/features/management-assessment/definitions/ManagementAssessment.data';

import ManagementAssessmentScreen from './ManagementAssessmentScreen';
import { styles } from './ManagementAssessmentScreen.styles';

type OtcMedicationScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function OtcMedicationScreen({
  onBack,
  onContinue,
}: OtcMedicationScreenProps) {
  const { responses, updateOtcMedication } = useManagementAssessment();
  const [medication, setMedication] = useState(responses.otcMedication);

  const recordMedication = () => {
    updateOtcMedication(medication.trim());
    onContinue();
  };

  return (
    <ManagementAssessmentScreen
      canRecord
      onBack={onBack}
      onRecord={recordMedication}
      sectionTitle={managementAssessmentCopy.medicationTitle}
      step={2}
    >
      <Text style={styles.prompt}>{managementAssessmentCopy.otcPrompt}</Text>
      <Text style={styles.helper}>{managementAssessmentCopy.otcHelper}</Text>

      <TextInput
        accessibilityLabel="Over-the-counter medication"
        maxLength={300}
        multiline
        onChangeText={setMedication}
        placeholder={managementAssessmentCopy.otcPlaceholder}
        placeholderTextColor="#7A747D"
        selectionColor="#6D50AC"
        style={styles.textArea}
        value={medication}
      />
    </ManagementAssessmentScreen>
  );
}

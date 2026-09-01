import { useState } from 'react';
import { Text } from 'react-native';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import {
  painAssessmentCopy,
  painCharacteristicOptions,
} from '@/features/pain-tracker/definitions/PainAssessment.data';
import type { PainCharacteristicId } from '@/features/pain-tracker/types/PainAssessment';

import PainAssessmentScreen from './PainAssessmentScreen';
import { styles } from './PainAssessmentScreen.styles';
import PainOptionList from './PainOptionList';

type PainCharacteristicsScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function PainCharacteristicsScreen({
  onBack,
  onContinue,
}: PainCharacteristicsScreenProps) {
  const { responses, updateCharacteristics } = usePainAssessment();
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    PainCharacteristicId[]
  >(responses.characteristics);
  const canRecord = selectedCharacteristics.length > 0;

  const toggleCharacteristic = (
    characteristicId: PainCharacteristicId,
  ) => {
    setSelectedCharacteristics((currentSelection) =>
      currentSelection.includes(characteristicId)
        ? currentSelection.filter((id) => id !== characteristicId)
        : [...currentSelection, characteristicId],
    );
  };

  const recordCharacteristics = () => {
    if (!canRecord) {
      return;
    }

    updateCharacteristics(selectedCharacteristics);
    onContinue();
  };

  return (
    <PainAssessmentScreen
      canRecord={canRecord}
      onBack={onBack}
      onRecord={recordCharacteristics}
      sectionTitle={painAssessmentCopy.characteristicsTitle}
      step={2}
    >
      <Text style={styles.prompt}>
        {painAssessmentCopy.characteristicsPrompt}
      </Text>
      <Text style={styles.helper}>
        {painAssessmentCopy.characteristicsHelper}
      </Text>

      <PainOptionList
        onToggle={toggleCharacteristic}
        options={painCharacteristicOptions}
        selectedIds={selectedCharacteristics}
      />
    </PainAssessmentScreen>
  );
}

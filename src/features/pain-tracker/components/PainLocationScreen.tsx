import { useState } from 'react';
import {
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import {
  painAssessmentCopy,
  painLocationOptions,
} from '@/features/pain-tracker/definitions/PainAssessment.data';
import type { PainLocationId } from '@/features/pain-tracker/types/PainAssessment';

import PainAssessmentScreen from './PainAssessmentScreen';
import { styles } from './PainAssessmentScreen.styles';
import PainOptionList from './PainOptionList';

type PainLocationScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function PainLocationScreen({
  onBack,
  onContinue,
}: PainLocationScreenProps) {
  const { responses, updateLocations } = usePainAssessment();
  const [selectedLocations, setSelectedLocations] = useState<
    PainLocationId[]
  >(responses.locations);
  const [otherLocation, setOtherLocation] = useState(responses.otherLocation);
  const [otherDraft, setOtherDraft] = useState(responses.otherLocation);
  const [isOtherDialogVisible, setIsOtherDialogVisible] = useState(false);
  const trimmedOtherLocation = otherLocation.trim();
  const canRecord =
    selectedLocations.length > 0 &&
    (!selectedLocations.includes('other') || trimmedOtherLocation.length > 0);
  const visibleLocationOptions = painLocationOptions.map((option) =>
    option.id === 'other' && trimmedOtherLocation
      ? { ...option, label: `Other: ${trimmedOtherLocation}` }
      : option,
  );

  const toggleLocation = (locationId: PainLocationId) => {
    if (locationId === 'other') {
      if (selectedLocations.includes('other')) {
        setSelectedLocations((currentSelection) =>
          currentSelection.filter((id) => id !== 'other'),
        );
        setOtherLocation('');
        setOtherDraft('');
        return;
      }

      setOtherDraft(otherLocation);
      setIsOtherDialogVisible(true);
      return;
    }

    setSelectedLocations((currentSelection) =>
      currentSelection.includes(locationId)
        ? currentSelection.filter((id) => id !== locationId)
        : [...currentSelection, locationId],
    );
  };

  const closeOtherDialog = () => {
    Keyboard.dismiss();
    setOtherDraft(otherLocation);
    setIsOtherDialogVisible(false);
  };

  const addOtherLocation = () => {
    const trimmedLocation = otherDraft.trim();

    if (!trimmedLocation) {
      return;
    }

    Keyboard.dismiss();
    setOtherLocation(trimmedLocation);
    setSelectedLocations((currentSelection) =>
      currentSelection.includes('other')
        ? currentSelection
        : [...currentSelection, 'other'],
    );
    setIsOtherDialogVisible(false);
  };

  const recordLocations = () => {
    if (!canRecord) {
      return;
    }

    updateLocations(selectedLocations, trimmedOtherLocation);
    onContinue();
  };

  return (
    <>
      <PainAssessmentScreen
        canRecord={canRecord}
        onBack={onBack}
        onRecord={recordLocations}
        sectionTitle={painAssessmentCopy.locationTitle}
        step={1}
      >
        <Text style={styles.prompt}>{painAssessmentCopy.locationPrompt}</Text>
        <Text style={styles.helper}>{painAssessmentCopy.locationHelper}</Text>

        <PainOptionList
          onToggle={toggleLocation}
          options={visibleLocationOptions}
          selectedIds={selectedLocations}
        />
      </PainAssessmentScreen>

      <Modal
        accessibilityViewIsModal
        animationType="fade"
        onRequestClose={closeOtherDialog}
        transparent
        visible={isOtherDialogVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {painAssessmentCopy.otherLocationTitle}
            </Text>

            <TextInput
              accessibilityLabel={painAssessmentCopy.otherLocationTitle}
              autoFocus
              onChangeText={setOtherDraft}
              onSubmitEditing={addOtherLocation}
              placeholder={painAssessmentCopy.otherLocationPlaceholder}
              placeholderTextColor="#7A747D"
              returnKeyType="done"
              selectionColor="#6D50AC"
              style={styles.modalInput}
              value={otherDraft}
            />

            <View style={styles.modalActions}>
              <Pressable
                accessibilityRole="button"
                onPress={closeOtherDialog}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.modalButtonPressed,
                ]}
              >
                <Text style={styles.modalButtonText}>
                  {painAssessmentCopy.cancelLabel}
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: !otherDraft.trim() }}
                disabled={!otherDraft.trim()}
                onPress={addOtherLocation}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed &&
                    otherDraft.trim().length > 0 &&
                    styles.modalButtonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    !otherDraft.trim() && styles.modalButtonTextDisabled,
                  ]}
                >
                  {painAssessmentCopy.addLabel}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import { otherConditionsScreenCopy } from './HealthConditionsScreen.data';
import { styles } from './HealthConditionsScreen.styles';

type OtherConditionsScreenProps = {
  onContinue: () => void;
};

export default function OtherConditionsScreen({
  onContinue,
}: OtherConditionsScreenProps) {
  const [conditions, setConditions] = useState('');
  const canContinue = conditions.trim().length > 0;

  const updateConditions = (value: string) => {
    setConditions(value);
  };

  const continueToNextStep = () => {
    if (!canContinue) {
      return;
    }

    Keyboard.dismiss();
    onContinue();
  };

  const skipToNextStep = () => {
    Keyboard.dismiss();
    onContinue();
  };

  return (
    <View style={[styles.content, styles.otherContent]}>
      <Text style={styles.title}>{otherConditionsScreenCopy.title}</Text>

      <TextInput
        accessibilityLabel={otherConditionsScreenCopy.title}
        multiline
        onChangeText={updateConditions}
        placeholder={otherConditionsScreenCopy.inputPlaceholder}
        placeholderTextColor="#7A747D"
        selectionColor="#6D50AC"
        style={styles.otherInput}
        value={conditions}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={continueToNextStep}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.otherButton,
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
          {otherConditionsScreenCopy.continueLabel}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={skipToNextStep}
        style={({ pressed }) => [
          styles.skipButton,
          pressed && styles.skipButtonPressed,
        ]}
      >
        <Text style={styles.skipButtonText}>
          {otherConditionsScreenCopy.skipLabel}
        </Text>
      </Pressable>
    </View>
  );
}

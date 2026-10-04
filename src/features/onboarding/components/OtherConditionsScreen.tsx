import { colors } from '@/theme';
import { useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';

import { useOnboarding } from '../OnboardingContext';

import { otherConditionsScreenCopy } from './HealthConditionsScreen.data';
import { styles } from './HealthConditionsScreen.styles';

type OtherConditionsScreenProps = {
  onContinue: () => void;
};

export default function OtherConditionsScreen({
  onContinue,
}: OtherConditionsScreenProps) {
  const { profile, updateProfile } = useOnboarding();
  const [conditions, setConditions] = useState(profile.otherConditions);
  const canContinue = conditions.trim().length > 0;

  const updateConditions = (value: string) => {
    setConditions(value);
  };

  const continueToNextStep = () => {
    if (!canContinue) {
      return;
    }

    Keyboard.dismiss();
    updateProfile({ otherConditions: conditions.trim() });
    onContinue();
  };

  const skipToNextStep = () => {
    Keyboard.dismiss();
    updateProfile({ otherConditions: '' });
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
        placeholderTextColor={colors.muted}
        selectionColor={colors.primary}
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

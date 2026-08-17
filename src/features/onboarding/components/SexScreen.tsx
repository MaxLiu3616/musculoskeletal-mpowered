import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import {
  sexOptions,
  sexScreenCopy,
  type SexOptionId,
} from './SexScreen.data';
import { styles } from './SexScreen.styles';

export default function SexScreen() {
  const [selectedSex, setSelectedSex] = useState<SexOptionId | null>(null);
  const [showNextStepMessage, setShowNextStepMessage] = useState(false);
  const canContinue = selectedSex !== null;

  const selectSex = (sex: SexOptionId) => {
    setSelectedSex(sex);
    setShowNextStepMessage(false);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{sexScreenCopy.title}</Text>

      <View style={styles.options}>
        {sexOptions.map((option) => {
          const isSelected = selectedSex === option.id;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              key={option.id}
              onPress={() => selectSex(option.id)}
              style={({ pressed }) => [
                styles.option,
                isSelected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={() => setShowNextStepMessage(true)}
        style={({ pressed }) => [
          styles.continueButton,
          !canContinue && styles.continueButtonDisabled,
          pressed && styles.continueButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.continueButtonText,
            !canContinue && styles.continueButtonTextDisabled,
          ]}
        >
          {sexScreenCopy.continueLabel}
        </Text>
      </Pressable>

      {showNextStepMessage ? (
        <Text accessibilityLiveRegion="polite" style={styles.actionMessage}>
          {sexScreenCopy.nextStepMessage}
        </Text>
      ) : null}

      <View
        style={[
          styles.research,
          showNextStepMessage && styles.researchWithMessage,
        ]}
      >
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={require('../../../../assets/images/sex-research-lightbulb.png')}
          style={styles.researchIcon}
        />
        <Text style={styles.researchMessage}>
          {sexScreenCopy.researchMessage}
        </Text>
      </View>
    </View>
  );
}

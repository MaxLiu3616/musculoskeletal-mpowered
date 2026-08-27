import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import {
  sexOptions,
  sexScreenCopy,
  type SexOptionId,
} from './SexScreen.data';
import { styles } from './SexScreen.styles';

type SexScreenProps = {
  onContinue: () => void;
};

export default function SexScreen({ onContinue }: SexScreenProps) {
  const [selectedSex, setSelectedSex] = useState<SexOptionId | null>(null);
  const canContinue = selectedSex !== null;

  const selectSex = (sex: SexOptionId) => {
    setSelectedSex(sex);
  };

  const continueToYearOfBirth = () => {
    if (selectedSex === null) {
      return;
    }

    onContinue();
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
        onPress={continueToYearOfBirth}
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

      <View style={styles.research}>
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

import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { yearOfBirthScreenCopy } from './YearOfBirthScreen.data';
import { styles } from './YearOfBirthScreen.styles';

const currentYear = new Date().getFullYear();

type YearOfBirthScreenProps = {
  onContinue: () => void;
};

export default function YearOfBirthScreen({
  onContinue,
}: YearOfBirthScreenProps) {
  const [year, setYear] = useState('');
  const canContinue =
    /^[1-9]\d{3}$/.test(year) && Number(year) <= currentYear;

  const updateYear = (value: string) => {
    setYear(value.replace(/\D/g, '').slice(0, 4));
  };

  const continueToHealthConditions = () => {
    if (!canContinue) {
      return;
    }

    onContinue();
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{yearOfBirthScreenCopy.title}</Text>

      <TextInput
        accessibilityLabel={yearOfBirthScreenCopy.title}
        inputMode="numeric"
        keyboardType="number-pad"
        maxLength={4}
        onChangeText={updateYear}
        onSubmitEditing={continueToHealthConditions}
        placeholder={yearOfBirthScreenCopy.placeholder}
        placeholderTextColor="#9A95A0"
        returnKeyType="done"
        selectionColor="#6D50AC"
        style={styles.input}
        value={year}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={continueToHealthConditions}
        style={({ pressed }) => [
          styles.continueButton,
          !canContinue && styles.continueButtonDisabled,
          pressed && canContinue && styles.continueButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.continueButtonText,
            !canContinue && styles.continueButtonTextDisabled,
          ]}
        >
          {yearOfBirthScreenCopy.continueLabel}
        </Text>
      </Pressable>

    </View>
  );
}

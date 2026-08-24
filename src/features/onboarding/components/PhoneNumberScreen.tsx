import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import { phoneNumberScreenCopy } from './LoginInformationScreen.data';
import { styles } from './LoginInformationScreen.styles';

type PhoneNumberScreenProps = {
  onContinue: () => void;
};

export default function PhoneNumberScreen({
  onContinue,
}: PhoneNumberScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const canContinue = phoneNumber.replace(/\D/g, '').length > 0;

  const continueToVerification = () => {
    if (!canContinue) {
      return;
    }

    Keyboard.dismiss();
    onContinue();
  };

  return (
    <View style={[styles.content, styles.phoneContent]}>
      <Text style={styles.title}>{phoneNumberScreenCopy.title}</Text>

      <TextInput
        accessibilityLabel={phoneNumberScreenCopy.inputLabel}
        autoComplete="tel"
        inputMode="tel"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        onSubmitEditing={continueToVerification}
        returnKeyType="done"
        selectionColor="#6D50AC"
        style={styles.phoneInput}
        textContentType="telephoneNumber"
        value={phoneNumber}
      />

      <Text style={styles.phoneHelper}>{phoneNumberScreenCopy.helper}</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={continueToVerification}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.phoneButton,
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
          {phoneNumberScreenCopy.continueLabel}
        </Text>
      </Pressable>
    </View>
  );
}

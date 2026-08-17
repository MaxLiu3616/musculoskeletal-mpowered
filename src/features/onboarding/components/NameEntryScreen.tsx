import { Pressable, Text, TextInput, View } from 'react-native';

import { nameScreenCopy } from './NameScreen.data';
import { styles } from './NameScreen.styles';

type NameEntryScreenProps = {
  canContinue: boolean;
  name: string;
  onContinue: () => void;
  onNameChange: (name: string) => void;
};

export default function NameEntryScreen({
  canContinue,
  name,
  onContinue,
  onNameChange,
}: NameEntryScreenProps) {
  return (
    <View style={styles.entryContent}>
      <Text style={styles.title}>{nameScreenCopy.title}</Text>

      <TextInput
        accessibilityLabel={nameScreenCopy.title}
        autoCapitalize="words"
        onChangeText={onNameChange}
        onSubmitEditing={onContinue}
        placeholder={nameScreenCopy.placeholder}
        placeholderTextColor="#9A95A0"
        returnKeyType="done"
        selectionColor="#6D50AC"
        style={styles.input}
        value={name}
      />

      <Text style={styles.personalisationMessage}>
        {nameScreenCopy.personalisationLead}{`\n`}
        <Text style={styles.termsEmphasis}>
          {nameScreenCopy.personalisationEmphasis}
        </Text>
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={onContinue}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.entryButton,
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
          {nameScreenCopy.continueLabel}
        </Text>
      </Pressable>

      <Text style={styles.addressMessage}>
        {nameScreenCopy.addressMessage}
      </Text>
    </View>
  );
}

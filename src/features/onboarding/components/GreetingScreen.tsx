import { Pressable, Text, View } from 'react-native';

import { nameScreenCopy } from './NameScreen.data';
import { styles } from './NameScreen.styles';

type GreetingScreenProps = {
  name: string;
  onContinue: () => void;
};

export default function GreetingScreen({
  name,
  onContinue,
}: GreetingScreenProps) {
  return (
    <View style={styles.greetingContent}>
      <Text style={styles.greeting}>
        {nameScreenCopy.greetingPrefix} {name} {nameScreenCopy.greetingWave}
      </Text>

      <Text style={styles.greetingIntro}>{nameScreenCopy.greetingIntro}</Text>

      <Pressable
        accessibilityRole="button"
        onPress={onContinue}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.greetingButton,
          pressed && styles.primaryButtonPressed,
        ]}
      >
        <Text style={styles.primaryButtonText}>
          {nameScreenCopy.continueLabel}
        </Text>
      </Pressable>

      <Text style={styles.termsText}>
        {nameScreenCopy.termsLead}{`\n`}
        <Text style={styles.termsEmphasis}>
          {nameScreenCopy.termsAndConditions}{`\n`}
          {nameScreenCopy.privacyPolicy}
        </Text>
      </Text>
    </View>
  );
}

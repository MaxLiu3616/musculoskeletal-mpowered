import { Pressable, Text, View } from 'react-native';

import { loginInformationIntroCopy } from './LoginInformationScreen.data';
import { styles } from './LoginInformationScreen.styles';

type LoginInformationIntroScreenProps = {
  name: string;
  onContinue: () => void;
};

export default function LoginInformationIntroScreen({
  name,
  onContinue,
}: LoginInformationIntroScreenProps) {
  const nameGreeting = name ? `, ${name}` : '';

  return (
    <View style={[styles.content, styles.introContent]}>
      <Text style={styles.introTitle}>
        {loginInformationIntroCopy.thankYouPrefix}
        {nameGreeting} {loginInformationIntroCopy.thankYouEmoji}
      </Text>

      <Text style={styles.introMessage}>
        {loginInformationIntroCopy.message}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={onContinue}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.introButton,
          pressed && styles.primaryButtonPressed,
        ]}
      >
        <Text style={styles.primaryButtonText}>
          {loginInformationIntroCopy.continueLabel}
        </Text>
      </Pressable>
    </View>
  );
}

import type { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { nameScreenCopy } from './NameScreen.data';
import { styles } from './NameScreen.styles';

type OnboardingScreenProps = {
  children: ReactNode;
  onBack: () => void;
  variant?: 'entry' | 'greeting' | 'sex';
};

export default function OnboardingScreen({
  children,
  onBack,
  variant = 'entry',
}: OnboardingScreenProps) {
  const goBack = () => {
    Keyboard.dismiss();
    onBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            hitSlop={4}
            onPress={goBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backButtonText}>
              {nameScreenCopy.backLabel}
            </Text>
          </Pressable>

          <View
            style={[
              styles.screen,
              variant === 'greeting' && styles.greetingScreen,
              variant === 'sex' && styles.sexScreen,
            ]}
          >
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

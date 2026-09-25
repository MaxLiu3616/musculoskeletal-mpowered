import Ionicons from '@expo/vector-icons/Ionicons';
import { BrandMark } from '@/components/ScreenHeader';
import { colors } from '@/theme';
import type { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import { AppText as Text } from '@/components/typography';

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.peach} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.onboardingHeader}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={4}
            onPress={goBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Ionicons name="arrow-back" size={20} color={colors.ink} />
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <BrandMark />
          </View>

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

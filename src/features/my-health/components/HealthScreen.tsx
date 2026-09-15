import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText as Text } from '@/components/typography';

import { styles } from './MyHealthScreen.styles';

type HealthScreenProps = {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  footer?: ReactNode;
};

export default function HealthScreen({
  title,
  children,
  onBack,
  footer,
}: HealthScreenProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.viewport,
        Platform.OS === 'web' &&
          styles.webViewport,
        { flex: 1 },
      ]}
    >
      <View
        style={styles.safeArea}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={top}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
          style={styles.keyboard}
        >
          <View style={styles.header}>
            {onBack ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed &&
                    styles.pressed,
                ]}
              >
                <Ionicons
                  name="arrow-back"
                  size={20}
                  color="#51465F"
                />

                <Text
                  style={styles.backText}
                >
                  Back
                </Text>
              </Pressable>
            ) : null}

            <Text
              accessibilityRole="header"
              style={styles.title}
            >
              {title}
            </Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={
              styles.content
            }
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>

          {footer}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

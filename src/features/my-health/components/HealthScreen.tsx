import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './MyHealthScreen.styles';

type HealthScreenProps = {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  footer?: ReactNode;
};

export default function HealthScreen({ title, children, onBack, footer }: HealthScreenProps) {
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView style={[styles.viewport, Platform.OS === 'web' && [styles.webViewport, { height: Math.min(height, 844), flex: undefined }]]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <View style={styles.header}>
          {onBack ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <Ionicons name="arrow-back" size={20} color="#51465F" />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          ) : null}
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
        {footer}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

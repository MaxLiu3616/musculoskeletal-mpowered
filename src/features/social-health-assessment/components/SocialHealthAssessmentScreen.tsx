import type { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText as Text } from '@/components/typography';

import { socialHealthAssessmentCopy } from '@/features/social-health-assessment/definitions/SocialHealthAssessment.data';

import { styles } from './SocialHealthAssessmentScreen.styles';

type SocialHealthAssessmentScreenProps = {
  children: ReactNode;
  sectionTitle: string;
  step: number;
  totalSteps: number;
  canRecord: boolean;
  compactCard?: boolean;
  onBack: () => void;
  onRecord: () => void;
};

export default function SocialHealthAssessmentScreen({
  children,
  sectionTitle,
  step,
  totalSteps,
  canRecord,
  compactCard = false,
  onBack,
  onRecord,
}: SocialHealthAssessmentScreenProps) {
  const { top } = useSafeAreaInsets();

  const goBack = () => {
    Keyboard.dismiss();
    onBack();
  };

  return (
    <View
      style={[
        styles.viewport,
        Platform.OS === 'web' &&
          styles.webViewport,
        { flex: 1 },
      ]}
    >
      <View style={styles.safeArea}>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />

        <KeyboardAvoidingView
          keyboardVerticalOffset={top}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={
              styles.scrollContent
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.screen}>
              <View style={styles.header}>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={4}
                  onPress={goBack}
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed &&
                      styles.backButtonPressed,
                  ]}
                >
                  <Text style={styles.backButtonText}>
                    {socialHealthAssessmentCopy.backLabel}
                  </Text>
                </Pressable>

                <Text style={styles.trackerTitle}>
                  {socialHealthAssessmentCopy.trackerTitle}
                </Text>
              </View>

              <Text style={styles.assessmentTitle}>
                {socialHealthAssessmentCopy.assessmentTitle}
              </Text>

              <View
                style={[
                  styles.questionCard,
                  compactCard
                    ? styles.questionCardCompact
                    : styles.questionCardFull,
                ]}
              >
                <Text style={styles.sectionTitle}>
                  {sectionTitle}
                </Text>

                <View style={styles.divider} />

                {children}

                <View style={styles.actionRow}>
                  <View
                    accessibilityLabel={`Question ${step} of ${totalSteps}`}
                    style={styles.stepBadge}
                  >
                    <Text style={styles.stepText}>
                      {step}/{totalSteps}
                    </Text>
                  </View>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{
                      disabled: !canRecord,
                    }}
                    disabled={!canRecord}
                    onPress={onRecord}
                    style={({ pressed }) => [
                      styles.recordButton,
                      !canRecord &&
                        styles.recordButtonDisabled,
                      pressed &&
                        canRecord &&
                        styles.recordButtonPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.recordButtonText,
                        !canRecord &&
                          styles.recordButtonTextDisabled,
                      ]}
                    >
                      {socialHealthAssessmentCopy.recordLabel}
                    </Text>

                    <Text
                      style={[
                        styles.recordArrow,
                        !canRecord &&
                          styles.recordButtonTextDisabled,
                      ]}
                    >
                      →
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

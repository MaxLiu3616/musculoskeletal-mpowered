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

import { painAssessmentCopy } from '@/features/pain-tracker/definitions/PainAssessment.data';

import { styles } from './PainAssessmentScreen.styles';

type PainAssessmentScreenProps = {
  children: ReactNode;
  sectionTitle: string;
  step: number;
  canRecord: boolean;
  compactCard?: boolean;
  onBack: () => void;
  onRecord: () => void;
};

export default function PainAssessmentScreen({
  children,
  sectionTitle,
  step,
  canRecord,
  compactCard = false,
  onBack,
  onRecord,
}: PainAssessmentScreenProps) {
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
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
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
                  <Text
                    style={styles.backButtonText}
                  >
                    {painAssessmentCopy.backLabel}
                  </Text>
                </Pressable>

                <Text
                  style={styles.trackerTitle}
                >
                  {
                    painAssessmentCopy.trackerTitle
                  }
                </Text>
              </View>

              <Text
                style={styles.assessmentTitle}
              >
                {
                  painAssessmentCopy.assessmentTitle
                }
              </Text>

              <View
                style={[
                  styles.questionCard,
                  compactCard
                    ? styles.questionCardCompact
                    : styles.questionCardFull,
                ]}
              >
                <Text
                  style={styles.sectionTitle}
                >
                  {sectionTitle}
                </Text>

                <View style={styles.divider} />

                {children}

                <View style={styles.actionRow}>
                  <View
                    accessibilityLabel={`Question ${step} of 6`}
                    style={styles.stepBadge}
                  >
                    <Text style={styles.stepText}>
                      {step}/6
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
                      {
                        painAssessmentCopy.recordLabel
                      }
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

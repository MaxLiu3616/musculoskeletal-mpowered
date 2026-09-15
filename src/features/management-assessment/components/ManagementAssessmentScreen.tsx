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

import { managementAssessmentCopy } from '@/features/management-assessment/definitions/ManagementAssessment.data';

import { styles } from './ManagementAssessmentScreen.styles';

type ManagementAssessmentScreenProps = {
  children: ReactNode;
  sectionTitle: string;
  step: number;
  canRecord: boolean;
  onBack: () => void;
  onRecord: () => void;
};

export default function ManagementAssessmentScreen({
  children,
  sectionTitle,
  step,
  canRecord,
  onBack,
  onRecord,
}: ManagementAssessmentScreenProps) {
  const { top } = useSafeAreaInsets();

  const goBack = () => {
    Keyboard.dismiss();
    onBack();
  };

  return (
    <View
      style={[
        styles.viewport,
        Platform.OS === 'web' && styles.webViewport,
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
            contentContainerStyle={styles.scrollContent}
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
                    pressed && styles.backButtonPressed,
                  ]}
                >
                  <Text style={styles.backButtonText}>
                    {managementAssessmentCopy.backLabel}
                  </Text>
                </Pressable>

                <Text style={styles.trackerTitle}>
                  {managementAssessmentCopy.trackerTitle}
                </Text>
              </View>

              <Text style={styles.assessmentTitle}>
                {managementAssessmentCopy.assessmentTitle}
              </Text>

              <View style={styles.questionCard}>
                <Text style={styles.sectionTitle}>
                  {sectionTitle}
                </Text>

                <View style={styles.divider} />

                {children}

                <View style={styles.actionRow}>
                  <View
                    accessibilityLabel={`Question ${step} of 4`}
                    style={styles.stepBadge}
                  >
                    <Text style={styles.stepText}>
                      {step}/4
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
                      {managementAssessmentCopy.recordLabel}
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

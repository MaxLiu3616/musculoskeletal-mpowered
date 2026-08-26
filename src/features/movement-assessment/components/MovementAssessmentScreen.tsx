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
import { movementAssessmentCopy } from '@/features/movement-assessment/definitions/MovementAssessment.data';
import { styles } from './MovementAssessmentScreen.styles';

type MovementAssessmentScreenProps = {
  children: ReactNode;
  sectionTitle: string;
  step: number;
  totalSteps: number;
  canRecord: boolean;
  onBack: () => void;
  onRecord: () => void;
};

export default function MovementAssessmentScreen({
  children,
  sectionTitle,
  step,
  totalSteps,
  canRecord,
  onBack,
  onRecord,
}: MovementAssessmentScreenProps) {
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
                  {movementAssessmentCopy.backLabel}
                </Text>
              </Pressable>
              <Text style={styles.trackerTitle}>
                {movementAssessmentCopy.trackerTitle}
              </Text>
            </View>
            <Text style={styles.assessmentTitle}>
              {movementAssessmentCopy.assessmentTitle}
            </Text>
            <View style={styles.questionCard}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>
              <View style={styles.divider} />
              {children}
              <View style={styles.actionRow}>
                <View
                  accessibilityLabel={`Question ${step} of ${totalSteps}`}
                  style={styles.stepBadge}
                >
                  <Text style={styles.stepText}>{step}/{totalSteps}</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ disabled: !canRecord }}
                  disabled={!canRecord}
                  onPress={onRecord}
                  style={({ pressed }) => [
                    styles.recordButton,
                    !canRecord && styles.recordButtonDisabled,
                    pressed && canRecord && styles.recordButtonPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.recordButtonText,
                      !canRecord && styles.recordButtonTextDisabled,
                    ]}
                  >
                    {movementAssessmentCopy.recordLabel}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
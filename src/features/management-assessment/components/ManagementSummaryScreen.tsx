import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import {
  getEmotionResult,
  getExerciseResult,
  getManagementOverview,
  getManagementPeriodLabel,
  getMedicationResult,
  managementAssessmentCopy,
} from '@/features/management-assessment/definitions/ManagementAssessment.data';

import { styles } from './ManagementAssessmentScreen.styles';

type ManagementSummaryScreenProps = {
  onBack: () => void;
  onClose: () => void;
  onExploreTips: () => void;
};

export default function ManagementSummaryScreen({
  onBack,
  onClose,
  onExploreTips,
}: ManagementSummaryScreenProps) {
  const { responses } = useManagementAssessment();
  const exerciseFrequency = responses.exerciseFrequency;

  if (!exerciseFrequency) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              hitSlop={4}
              onPress={onBack}
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
            {managementAssessmentCopy.summaryScreenTitle}
          </Text>
          <Text style={styles.prompt}>
            {managementAssessmentCopy.summaryIntro}
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryTitleRow}>
              <Text style={styles.sectionTitle}>
                {managementAssessmentCopy.assessmentTitle}
              </Text>
              <Text style={styles.summaryPeriod}>
                Period: {getManagementPeriodLabel()}
              </Text>
            </View>
            <View style={styles.divider} />

            <Text style={styles.summarySectionTitle}>
              {managementAssessmentCopy.summaryTitle}
            </Text>

            <View style={styles.overviewPanel}>
              <Text style={styles.overviewText}>
                {getManagementOverview(responses)}
              </Text>
              <Pressable
                accessibilityRole="link"
                onPress={onExploreTips}
                style={({ pressed }) => [
                  styles.tipsButton,
                  pressed && styles.tipsButtonPressed,
                ]}
              >
                <Text style={styles.tipsButtonText}>
                  {managementAssessmentCopy.exploreTipsLabel}
                </Text>
              </Pressable>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.summarySectionTitle}>
                {managementAssessmentCopy.resultsTitle}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>Medication:</Text>
              <Text style={styles.resultText}>
                {getMedicationResult(responses)}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>Exercise:</Text>
              <Text style={styles.resultText}>
                {getExerciseResult(exerciseFrequency)}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>Emotion:</Text>
              <Text style={styles.resultText}>
                {getEmotionResult(responses.emotionStrategy)}
              </Text>
            </View>

            <View style={styles.summaryFooter}>
              <Text style={styles.journalStatus}>
                {managementAssessmentCopy.journalStatus}
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.closeButtonPressed,
                ]}
              >
                <Text style={styles.closeButtonText}>
                  {managementAssessmentCopy.closeLabel}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

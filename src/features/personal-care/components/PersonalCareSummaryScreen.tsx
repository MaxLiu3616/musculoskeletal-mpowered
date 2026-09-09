import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import {
  findGeneralActivityLabel,
  findPersonalCareLabel,
  findSleepLabel,
  getAssessmentPeriodLabel,
  getPersonalCareSummaryDescription,
  getPersonalCareTotalScore,
  personalCareAssessmentCopy,
} from '@/features/personal-care/definitions/PersonalCareAssessment.data';

import { styles } from './PersonalCareAssessmentScreen.styles';

type PersonalCareSummaryScreenProps = {
  onBack: () => void;
  onClose: () => void;
  onExploreTips: () => void;
};

export default function PersonalCareSummaryScreen({
  onBack,
  onClose,
  onExploreTips,
}: PersonalCareSummaryScreenProps) {
  const { height: viewportHeight } = useWindowDimensions();

  const appHeight =
    Platform.OS === 'web'
      ? Math.min(viewportHeight, 844)
      : viewportHeight;

  const { responses } = usePersonalCareAssessment();

  const generalActivityLabels =
    responses.generalActivityImpacts.map(
      (id) => findGeneralActivityLabel(id) ?? id,
    );

  const personalCareLabel = responses.personalCare
    ? findPersonalCareLabel(responses.personalCare)
    : null;

  const sleepLabel = responses.sleep
    ? findSleepLabel(responses.sleep)
    : null;

  const totalScore = getPersonalCareTotalScore(
    responses.generalActivityImpacts,
    responses.personalCare,
    responses.sleep,
  );

  const description =
    getPersonalCareSummaryDescription(totalScore);

  const reflection = responses.reflection.trim();

  return (
    <View
      style={[
        styles.viewport,
        Platform.OS === 'web' && styles.webViewport,
        {
          height: appHeight,
          maxHeight: appHeight,
        },
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />

        <ScrollView
          contentContainerStyle={styles.summaryScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.summaryScreen}>
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
                  {personalCareAssessmentCopy.backLabel}
                </Text>
              </Pressable>

              <Text style={styles.trackerTitle}>
                {personalCareAssessmentCopy.trackerTitle}
              </Text>
            </View>

            <Text style={styles.assessmentTitle}>
              {personalCareAssessmentCopy.summaryScreenTitle}
            </Text>

            <Text style={styles.summaryIntro}>
              {personalCareAssessmentCopy.summaryIntro}
            </Text>

            <View style={styles.summaryCard}>
              <View style={styles.summaryTitleRow}>
                <Text style={styles.summaryCardTitle}>
                  {personalCareAssessmentCopy.summaryTitle}
                </Text>

                <Text style={styles.summaryPeriod}>
                  Period: {getAssessmentPeriodLabel()}
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <Text style={styles.summarySectionTitle}>
                Summary
              </Text>

              <View style={styles.summaryHighlightBox}>
                <Text style={styles.summaryHighlightText}>
                  {description.firstLine}{' '}
                  <Text style={styles.summaryHighlightBold}>
                    {description.boldPhrase}
                  </Text>{' '}
                  {description.secondLine}
                </Text>

                <Pressable
                  accessibilityRole="link"
                  onPress={onExploreTips}
                  style={({ pressed }) => [
                    styles.exploreTipsButton,
                    pressed && styles.exploreTipsButtonPressed,
                  ]}
                >
                  <Ionicons
                    name="search-outline"
                    size={15}
                    color="#17151B"
                  />

                  <Text style={styles.exploreTipsText}>
                    Explore tips on daily living
                  </Text>
                </Pressable>
              </View>

              <View style={styles.summaryResultsSection}>
                <Text style={styles.summarySectionTitle}>
                  My results:
                </Text>

                <View style={styles.summaryResultsContent}>
                  <View style={styles.summaryResultGroup}>
                    <Text style={styles.summaryItem}>
                      General Activities:
                    </Text>

                    <Text style={styles.summaryText}>
                      {generalActivityLabels.length > 0
                        ? `${generalActivityLabels.join(', ')}.`
                        : 'No impacts selected.'}
                    </Text>
                  </View>

                  <View style={styles.summaryResultGroup}>
                    <Text style={styles.summaryItem}>
                      Personal care (washing, dressing, etc):
                    </Text>

                    <Text style={styles.summaryText}>
                      {personalCareLabel
                        ? `${personalCareLabel}.`
                        : 'Not recorded.'}
                    </Text>
                  </View>

                  <View style={styles.summaryResultGroup}>
                    <Text style={styles.summaryItem}>
                      Sleeping:
                    </Text>

                    <Text style={styles.summaryText}>
                      {sleepLabel
                        ? `${sleepLabel}.`
                        : 'Not recorded.'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.summaryReflectionSection}>
                <Text style={styles.summarySectionTitle}>
                  My reflections:
                </Text>

                <View style={styles.summaryReflectionContent}>
                  <Text style={styles.summaryText}>
                    {reflection || 'No reflection recorded.'}
                  </Text>
                </View>
              </View>

              <View style={styles.summaryFooterDivider} />

              <View style={styles.summaryFooter}>
                <Text style={styles.sessionNote}>
                  {personalCareAssessmentCopy.summarySessionNote}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={onClose}
                  style={({ pressed }) => [
                    styles.summaryCloseButton,
                    pressed && styles.summaryCloseButtonPressed,
                  ]}
                >
                  <Text style={styles.summaryCloseButtonText}>
                    {personalCareAssessmentCopy.closeLabel}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
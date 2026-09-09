import { Ionicons } from '@expo/vector-icons';
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

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import {
  generalMovementImpactOptions,
  getMovementAssessmentPeriodLabel,
  getMovementImpactPhrase,
  movementAssessmentCopy,
  movementImpactSections,
} from '@/features/movement-assessment/definitions/MovementAssessment.data';
import type { MovementImpactArea } from '@/features/movement-assessment/types/MovementAssessment';

import { styles } from './MovementSummaryScreen.styles';

type MovementSummaryScreenProps = {
  onBack: () => void;
  onClose: () => void;
  onExploreTips: () => void;
};

const resultAreas: readonly MovementImpactArea[] = [
  'walking',
  'lifting',
  'sitting',
  'standing',
];

export default function MovementSummaryScreen({
  onBack,
  onClose,
  onExploreTips,
}: MovementSummaryScreenProps) {
  const { height: viewportHeight } = useWindowDimensions();

  const appHeight =
    Platform.OS === 'web'
      ? Math.min(viewportHeight, 844)
      : viewportHeight;

  const { responses } = useMovementAssessment();

  const scoredResponseTotal = resultAreas.reduce(
    (total, area) => total + (responses[area] ?? 0),
    0,
  );

  const totalScore =
    responses.generalImpacts.length + scoredResponseTotal;

  const impactPhrase =
    getMovementImpactPhrase(totalScore);

  const selectedGeneralImpacts =
    generalMovementImpactOptions
      .filter((option) =>
        responses.generalImpacts.includes(option.id),
      )
      .map((option) => option.label)
      .join(' and ');

  const reflection =
    responses.reflection?.trim();

  const activityHours =
    responses.hoursActiveLastWeek;

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
                  {movementAssessmentCopy.backLabel}
                </Text>
              </Pressable>

              <Text style={styles.trackerTitle}>
                {movementAssessmentCopy.trackerTitle}
              </Text>
            </View>

            <Text style={styles.screenTitle}>
              {movementAssessmentCopy.summaryScreenTitle}
            </Text>

            <Text style={styles.helper}>
              {movementAssessmentCopy.summaryHelper}
            </Text>

            <View style={styles.summaryCard}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>
                  {movementAssessmentCopy.assessmentTitle}
                </Text>

                <Text style={styles.period}>
                  Period: {getMovementAssessmentPeriodLabel()}
                </Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>
                {movementAssessmentCopy.summaryTitle}
              </Text>

              <View style={styles.scorePanel}>
                <Text style={styles.scoreMessage}>
                  Your answers indicate that pain{' '}
                  <Text style={styles.scoreEmphasis}>
                    {impactPhrase}
                  </Text>{' '}
                  your movement.{' '}
                  {movementAssessmentCopy.summarySupportMessage}
                </Text>

                <Pressable
                  accessibilityRole="link"
                  onPress={onExploreTips}
                  style={({ pressed }) => [
                    styles.tipsButton,
                    pressed && styles.tipsButtonPressed,
                  ]}
                >
                  <Ionicons
                    name="search-outline"
                    size={15}
                    color="#17151B"
                  />

                  <Text style={styles.tipsButtonText}>
                    {movementAssessmentCopy.exploreTipsLabel}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.resultsSection}>
                <Text style={styles.resultsTitle}>
                  {movementAssessmentCopy.resultsTitle}
                </Text>

                <View style={styles.resultsContent}>
                  <View style={styles.resultGroup}>
                    <Text style={styles.resultLabel}>
                      Average activity hour:
                    </Text>

                    <Text style={styles.resultText}>
                      {activityHours === null ? (
                        'Not recorded.'
                      ) : (
                        <>
                          Last week, I was able to stay active
                          for approximately {activityHours}{' '}
                          {activityHours === 1 ? 'hour' : 'hours'}.
                        </>
                      )}
                    </Text>
                  </View>

                  <View style={styles.resultGroup}>
                    <Text style={styles.resultLabel}>
                      General Movement:
                    </Text>

                    <Text style={styles.resultText}>
                      {selectedGeneralImpacts.length > 0
                        ? `${selectedGeneralImpacts}.`
                        : 'Not recorded.'}
                    </Text>
                  </View>

                  {resultAreas.map((area) => {
                    const selectedScore =
                      responses[area];

                    const selectedOption =
                      movementImpactSections[
                        area
                      ].options.find(
                        (option) =>
                          option.score === selectedScore,
                      );

                    return (
                      <View
                        key={area}
                        style={styles.resultGroup}
                      >
                        <Text style={styles.resultLabel}>
                          {movementImpactSections[
                            area
                          ].title.replace(
                            ' Impacts',
                            '',
                          )}
                          :
                        </Text>

                        <Text style={styles.resultText}>
                          {selectedOption
                            ? `${selectedOption.label}.`
                            : 'Not recorded.'}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.reflectionSection}>
                <Text style={styles.resultsTitle}>
                  {
                    movementAssessmentCopy.reflectionSummaryTitle
                  }
                </Text>

                <View style={styles.reflectionContent}>
                  <Text style={styles.resultText}>
                    {reflection ||
                      'No reflection recorded.'}
                  </Text>
                </View>
              </View>

              <View style={styles.footerDivider} />

              <View style={styles.footer}>
                <Text style={styles.savedText}>
                  {movementAssessmentCopy.savedLabel}
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
                    {movementAssessmentCopy.closeLabel}
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
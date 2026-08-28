import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import {
  generalMovementImpactOptions,
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

function getAssessmentPeriod() {
  const today = new Date();
  const start = new Date(today);
  const daysFromMonday = (today.getDay() + 6) % 7;
  start.setDate(today.getDate() - daysFromMonday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const month = new Intl.DateTimeFormat('en-AU', { month: 'short' });

  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}-${end.getDate()} ${month.format(end)}`;
  }

  return `${start.getDate()} ${month.format(start)}-${end.getDate()} ${month.format(end)}`;
}

export default function MovementSummaryScreen({
  onBack,
  onClose,
  onExploreTips,
}: MovementSummaryScreenProps) {
  const { responses } = useMovementAssessment();
  const scoredResponseTotal = resultAreas.reduce(
    (total, area) => total + (responses[area] ?? 0),
    0,
  );
  const totalScore = responses.generalImpacts.length + scoredResponseTotal;
  const impactPhrase = getMovementImpactPhrase(totalScore);
  const selectedGeneralImpacts = generalMovementImpactOptions
    .filter((option) => responses.generalImpacts.includes(option.id))
    .map((option) => option.label)
    .join(' and ');
  const reflection = responses.reflection?.trim();
  const activityHours = responses.hoursActiveLastWeek ?? 0;

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
              <Text style={styles.period}>Period: {getAssessmentPeriod()}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>
              {movementAssessmentCopy.summaryTitle}
            </Text>

            <View style={styles.scorePanel}>
              <Text style={styles.scoreMessage}>
                Your answers indicate that pain{' '}
                <Text style={styles.scoreEmphasis}>{impactPhrase}</Text> your
                movement. {movementAssessmentCopy.summarySupportMessage}
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
                  {movementAssessmentCopy.exploreTipsLabel}
                </Text>
              </Pressable>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.sectionTitle}>
                {movementAssessmentCopy.resultsTitle}
              </Text>
              <Text style={styles.resultLabel}>Average activity hours:</Text>
              <Text style={styles.resultText}>
                Last week, I was able to stay active for approximately{' '}
                {activityHours} {activityHours === 1 ? 'hour' : 'hours'}.
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>General Movement:</Text>
              <Text style={styles.resultText}>{selectedGeneralImpacts}.</Text>
            </View>

            {resultAreas.map((area) => {
              const selectedScore = responses[area];
              const selectedOption = movementImpactSections[area].options.find(
                (option) => option.score === selectedScore,
              );

              return (
                <View key={area} style={styles.resultGroup}>
                  <Text style={styles.resultLabel}>
                    {movementImpactSections[area].title.replace(' Impacts', '')}:
                  </Text>
                  <Text style={styles.resultText}>{selectedOption?.label}.</Text>
                </View>
              );
            })}

            <View style={styles.resultGroup}>
              <Text style={styles.sectionTitle}>
                {movementAssessmentCopy.reflectionSummaryTitle}
              </Text>
              <Text style={styles.resultText}>
                {reflection || 'No reflection recorded.'}
              </Text>
            </View>

            <View style={styles.closeRow}>
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
  );
}

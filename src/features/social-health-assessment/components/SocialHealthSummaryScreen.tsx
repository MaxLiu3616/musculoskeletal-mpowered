import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import {
  findSocialLifeLabel,
  findTravellingLabel,
  getEnjoymentSummaryText,
  getMoodSummaryText,
  getRelationshipSummaryText,
  getSocialHealthImpactLevel,
  getSocialHealthTotalScore,
} from '@/features/social-health-assessment/definitions/SocialHealthSummary.data';

import { styles } from './SocialHealthSummaryScreen.styles';

type SocialHealthSummaryScreenProps = {
  onBack: () => void;
  onClose: () => void;
  onExploreTips: () => void;
};

function getAssessmentPeriod() {
  const today = new Date();

  const start = new Date(today);
  const daysFromMonday =
    (today.getDay() + 6) % 7;

  start.setDate(
    today.getDate() - daysFromMonday,
  );

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const month = new Intl.DateTimeFormat(
    'en-AU',
    {
      month: 'short',
    },
  );

  if (
    start.getMonth() === end.getMonth()
  ) {
    return `${start.getDate()}-${end.getDate()} ${month.format(end)}`;
  }

  return `${start.getDate()} ${month.format(start)}-${end.getDate()} ${month.format(end)}`;
}

export default function SocialHealthSummaryScreen({
  onBack,
  onClose,
  onExploreTips,
}: SocialHealthSummaryScreenProps) {
  const { responses } =
    useSocialHealthAssessment();

  const totalScore =
    getSocialHealthTotalScore(responses);

  const impactLevel =
    getSocialHealthImpactLevel(totalScore);

  const socialLife =
    responses.socialLife === null
      ? 'Not recorded.'
      : `${findSocialLifeLabel(
          responses.socialLife,
        )}.`;

  const travelling =
    responses.travelling === null
      ? 'Not recorded.'
      : `${findTravellingLabel(
          responses.travelling,
        )}.`;

  const mood =
    responses.moodImpact === null
      ? 'Not recorded.'
      : getMoodSummaryText(
          responses.moodImpact,
        );

  const relationship =
    responses.relationshipImpact === null
      ? 'Not recorded.'
      : getRelationshipSummaryText(
          responses.relationshipImpact,
        );

  const enjoyment =
    responses.enjoymentImpact === null
      ? 'Not recorded.'
      : getEnjoymentSummaryText(
          responses.enjoymentImpact,
        );

  const reflection =
    responses.reflection.trim();

  const renderImpactSummary = () => {
    switch (impactLevel) {
      case 'minimal':
        return (
          <Text style={styles.summaryMessage}>
            Your answers indicate that pain does{' '}
            <Text style={styles.summaryEmphasis}>
              not
            </Text>{' '}
            really impact your social health. With
            the right treatment and support, you
            can stay more active and connected.
          </Text>
        );

      case 'mild':
        return (
          <Text style={styles.summaryMessage}>
            Your answers indicate that pain{' '}
            <Text style={styles.summaryEmphasis}>
              mildly
            </Text>{' '}
            impacts your social health. With the
            right treatment and support, you can
            stay more active and connected.
          </Text>
        );

      case 'moderate':
        return (
          <Text style={styles.summaryMessage}>
            Your answers indicate that pain{' '}
            <Text style={styles.summaryEmphasis}>
              moderately
            </Text>{' '}
            impacts your social health. With the
            right treatment and support, you can
            stay more active and connected.
          </Text>
        );

      case 'significant':
        return (
          <Text style={styles.summaryMessage}>
            Your answers indicate that pain{' '}
            <Text style={styles.summaryEmphasis}>
              significantly
            </Text>{' '}
            impacts your social health. With the
            right treatment and support, you can
            stay more active and connected.
          </Text>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
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
                pressed &&
                  styles.backButtonPressed,
              ]}
            >
              <Text
                style={styles.backButtonText}
              >
                ← Back
              </Text>
            </Pressable>

            <Text style={styles.trackerTitle}>
              Pain Tracker
            </Text>
          </View>

          <Text style={styles.screenTitle}>
            My Social Health Summary
          </Text>

          <Text style={styles.helper}>
            Your answers help your doctor focus
            on what matters most to your daily
            life.
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>
                My Social Health
              </Text>

              <Text style={styles.period}>
                Period: {getAssessmentPeriod()}
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>
              Summary
            </Text>

            <View style={styles.summaryPanel}>
              <View
                style={styles.summaryMessageArea}
              >
                {renderImpactSummary()}
              </View>

              <Pressable
                accessibilityRole="link"
                onPress={onExploreTips}
                style={({ pressed }) => [
                  styles.tipsButton,
                  pressed &&
                    styles.tipsButtonPressed,
                ]}
              >
                <Ionicons
                  color="#342E3A"
                  name="search"
                  size={14}
                />

                <Text
                  style={styles.tipsButtonText}
                >
                  Explore tips on managing emotions
                </Text>
              </Pressable>
            </View>

            <Text style={styles.resultsTitle}>
              My results:
            </Text>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>
                Social life:
              </Text>

              <Text style={styles.resultText}>
                {socialLife}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>
                Travelling:
              </Text>

              <Text style={styles.resultText}>
                {travelling}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>
                Mood:
              </Text>

              <Text style={styles.resultText}>
                {mood}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>
                Relation with others:
              </Text>

              <Text style={styles.resultText}>
                {relationship}
              </Text>
            </View>

            <View style={styles.resultGroup}>
              <Text style={styles.resultLabel}>
                Enjoyment of life:
              </Text>

              <Text style={styles.resultText}>
                {enjoyment}
              </Text>
            </View>

            <View style={styles.reflectionGroup}>
              <Text style={styles.reflectionLabel}>
                My reflections on mood:
              </Text>

              <Text style={styles.reflectionText}>
                {reflection ||
                  'No reflection recorded.'}
              </Text>
            </View>

            <View style={styles.closeRow}>
              <Text style={styles.savedText}>
                Saved to Care Journal
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed &&
                    styles.closeButtonPressed,
                ]}
              >
                <Text
                  style={styles.closeButtonText}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
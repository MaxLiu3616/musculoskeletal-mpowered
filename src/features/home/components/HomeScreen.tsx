import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import InsightCard from './InsightCard';
import type { PainInsight } from './InsightCard.data';

import HomeSummarySwipe from './HomeSummarySwipe';
import type {
  HomeSummaryItem,
  HomeSummaryType,
} from './HomeSummaryCard.data';

import {
  homeAssessments,
  homeScreenCopy,
  type HomeAssessmentId,
  type HomeAssessmentStatus,
} from './HomeScreen.data';

import { styles } from './HomeScreen.styles';

type HomeScreenProps = {
  userName: string;

  assessmentStatus: Record<
    HomeAssessmentId,
    HomeAssessmentStatus
  >;

  painInsight?: PainInsight | null;

  summaryItems?: HomeSummaryItem[];

  onAssessmentPress?: (
    assessmentId: HomeAssessmentId,
  ) => void;

  onReflectionPress?: () => void;

  onDismissInsight?: () => void;

  onCheckPainHistory?: () => void;

  onPlanAppointment?: () => void;

  onCheckPainGuide?: () => void;

  onSummaryPress?: (
    type: HomeSummaryType,
  ) => void;
};

export default function HomeScreen({
  userName,
  assessmentStatus,
  painInsight = null,
  summaryItems = [],
  onAssessmentPress,
  onReflectionPress,
  onDismissInsight,
  onCheckPainHistory,
  onPlanAppointment,
  onCheckPainGuide,
  onSummaryPress,
}: HomeScreenProps) {
  const { height: viewportHeight } =
    useWindowDimensions();

  // Keep a phone-sized viewport on web.
  const appHeight =
    Platform.OS === 'web'
      ? Math.min(viewportHeight, 844)
      : viewportHeight;

  const totalAssessments =
    homeAssessments.length;

  const completedAssessments =
    homeAssessments.filter(
      (assessment) =>
        assessmentStatus[assessment.id]
          .completed,
    ).length;

  const progressPercentage =
    (completedAssessments /
      totalAssessments) *
    100;

  const remainingAssessments =
    totalAssessments -
    completedAssessments;

  return (
    <View
      style={[
        styles.viewport,
        Platform.OS === 'web' &&
          styles.webViewport,
        {
          height: appHeight,
          maxHeight: appHeight,
        },
      ]}
    >
      <ScrollView
        bounces={false}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator
        style={styles.screen}
      >
        <View style={styles.content}>
          {/* Greeting */}
          <Text style={styles.greeting}>
            {homeScreenCopy.greetingPrefix},{' '}
            {userName} ☀️
          </Text>

          {/* Heading */}
          <Text style={styles.heading}>
            {homeScreenCopy.heading}
          </Text>

          <Text style={styles.subtitle}>
            {homeScreenCopy.subtitle}
          </Text>

          {/* Weekly progress */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width:
                    `${progressPercentage}%` as `${number}%`,
                },
              ]}
            />
          </View>

          {completedAssessments > 0 &&
          remainingAssessments > 0 ? (
            <Text style={styles.taskRemaining}>
              ✨ {remainingAssessments} more{' '}
              {remainingAssessments === 1
                ? 'task'
                : 'tasks'}{' '}
              this week
            </Text>
          ) : null}

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>
              {homeScreenCopy.progressLabel}
            </Text>

            <Text style={styles.progressCount}>
              {completedAssessments}/
              {totalAssessments}{' '}
              {homeScreenCopy.assessmentsLabel}
            </Text>
          </View>

          {/* Pain insight */}
          <InsightCard
            insight={painInsight}
            onDismiss={onDismissInsight}
            onCheckPainHistory={
              onCheckPainHistory
            }
            onPlanAppointment={
              onPlanAppointment
            }
            onCheckPainGuide={
              onCheckPainGuide
            }
          />

          {/* Health summary cards */}
          <HomeSummarySwipe
            items={summaryItems}
            onItemPress={onSummaryPress}
          />

          {/* Weekly assessments */}
          <View
            style={styles.assessmentSection}
          >
            <Text
              style={
                styles.assessmentSectionTitle
              }
            >
              {
                homeScreenCopy.assessmentSectionTitle
              }
            </Text>

            <View
              style={styles.assessmentList}
            >
              {homeAssessments.map(
                (assessment) => {
                  const status =
                    assessmentStatus[
                      assessment.id
                    ];

                  return (
                    <View
                      key={assessment.id}
                      style={
                        styles.assessmentCard
                      }
                    >
                      <View
                        style={
                          styles.assessmentTextGroup
                        }
                      >
                        <Text
                          style={
                            styles.assessmentLabel
                          }
                        >
                          {assessment.label}
                        </Text>

                        {status.updatedAt ? (
                          <Text
                            style={
                              styles.assessmentUpdatedAt
                            }
                          >
                            {
                              homeScreenCopy.updatedLabel
                            }{' '}
                            {status.updatedAt}
                          </Text>
                        ) : null}
                      </View>

                      <Pressable
                        accessibilityRole="button"
                        onPress={() =>
                          onAssessmentPress?.(
                            assessment.id,
                          )
                        }
                        style={({
                          pressed,
                        }) => [
                          styles.recordButton,
                          pressed &&
                            styles.recordButtonPressed,
                        ]}
                      >
                        <Text
                          style={
                            styles.recordButtonText
                          }
                        >
                          {
                            homeScreenCopy.recordLabel
                          }
                        </Text>

                        <Text
                          style={
                            styles.recordArrow
                          }
                        >
                          →
                        </Text>
                      </Pressable>
                    </View>
                  );
                },
              )}
            </View>
          </View>

          {/* Reflection */}
          <Pressable
            accessibilityRole="button"
            onPress={onReflectionPress}
            style={({ pressed }) => [
              styles.reflectionButton,
              pressed &&
                styles.reflectionButtonPressed,
            ]}
          >
            <Text style={styles.reflectionPlus}>
              ＋
            </Text>

            <Text style={styles.reflectionText}>
              {homeScreenCopy.reflectionLabel}
            </Text>
          </Pressable>

          {/* Sponsor */}
          <Text style={styles.supportedBy}>
            {homeScreenCopy.supportedByLabel}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
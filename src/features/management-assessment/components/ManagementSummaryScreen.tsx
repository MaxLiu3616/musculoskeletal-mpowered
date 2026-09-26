import MotionPressable from '@/components/motion/MotionPressable';
import ScreenHeader from '@/components/ScreenHeader';
import { colors } from '@/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import { AppText as Text } from '@/components/typography';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import {
  getEmotionResult,
  getExerciseResult,
  getManagementOverview,
  getMedicationResult,
  managementAssessmentCopy,
} from '@/features/management-assessment/definitions/ManagementAssessment.data';

import { styles } from './ManagementAssessmentScreen.styles';

type ManagementSummaryScreenProps = {
  periodLabel: string;
  onBack: () => void;
  onClose: () => void;
  onExploreTips: () => void;
};

export default function ManagementSummaryScreen({
  periodLabel,
  onBack,
  onClose,
  onExploreTips,
}: ManagementSummaryScreenProps) {
  const { responses } =
    useManagementAssessment();

  const exerciseFrequency =
    responses.exerciseFrequency;

  if (!exerciseFrequency) {
    return null;
  }

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
          backgroundColor={colors.peach}
        />

        <ScrollView
          contentContainerStyle={
            styles.summaryScrollContent
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.summaryScreen}>
            <View style={{ marginHorizontal: -20, marginBottom: 18 }}>
              <ScreenHeader title="Management summary" eyebrow="Weekly check-in" onBack={onBack} />
            </View>

            <Text
              style={styles.summaryIntro}
            >
              {
                managementAssessmentCopy.summaryIntro
              }
            </Text>

            <View style={styles.summaryCard}>
              <View
                style={styles.summaryTitleRow}
              >
                <Text
                  style={
                    styles.summaryCardTitle
                  }
                >
                  {
                    managementAssessmentCopy.assessmentTitle
                  }
                </Text>

                <Text
                  style={styles.summaryPeriod}
                >
                  Period: {periodLabel}
                </Text>
              </View>

              <View
                style={styles.summaryDivider}
              />

              <Text
                style={
                  styles.summarySectionTitle
                }
              >
                {
                  managementAssessmentCopy.summaryTitle
                }
              </Text>

              <View
                style={styles.overviewPanel}
              >
                <Text
                  style={styles.overviewText}
                >
                  {getManagementOverview(
                    responses,
                  )}
                </Text>

                <MotionPressable
                  accessibilityRole="link"
                  onPress={onExploreTips}
                  style={({ pressed }) => [
                    styles.tipsButton,
                    pressed &&
                      styles.tipsButtonPressed,
                  ]}
                >
                  <Ionicons
                    color={colors.ink}
                    name="search-outline"
                    size={15}
                  />

                  <Text
                    style={
                      styles.tipsButtonText
                    }
                  >
                    {
                      managementAssessmentCopy.exploreTipsLabel
                    }
                  </Text>
                </MotionPressable>
              </View>

              <View
                style={
                  styles.resultsSection
                }
              >
                <Text
                  style={
                    styles.summarySectionTitle
                  }
                >
                  {
                    managementAssessmentCopy.resultsTitle
                  }
                </Text>

                <View
                  style={
                    styles.resultsContent
                  }
                >
                  <View
                    style={
                      styles.resultGroup
                    }
                  >
                    <Text
                      style={
                        styles.resultLabel
                      }
                    >
                      Medication:
                    </Text>

                    <Text
                      style={
                        styles.resultText
                      }
                    >
                      {getMedicationResult(
                        responses,
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.resultGroup
                    }
                  >
                    <Text
                      style={
                        styles.resultLabel
                      }
                    >
                      Exercise:
                    </Text>

                    <Text
                      style={
                        styles.resultText
                      }
                    >
                      {getExerciseResult(
                        exerciseFrequency,
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.resultGroup
                    }
                  >
                    <Text
                      style={
                        styles.resultLabel
                      }
                    >
                      Emotion:
                    </Text>

                    <Text
                      style={
                        styles.resultText
                      }
                    >
                      {getEmotionResult(
                        responses.emotionStrategy,
                      )}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={
                  styles.summaryFooterDivider
                }
              />

              <View
                style={styles.summaryFooter}
              >
                <Text
                  style={
                    styles.journalStatus
                  }
                >
                  {
                    managementAssessmentCopy.journalStatus
                  }
                </Text>

                <MotionPressable
                  accessibilityRole="button"
                  onPress={onClose}
                  style={({ pressed }) => [
                    styles.closeButton,
                    pressed &&
                      styles.closeButtonPressed,
                  ]}
                >
                  <Text
                    style={
                      styles.closeButtonText
                    }
                  >
                    {
                      managementAssessmentCopy.closeLabel
                    }
                  </Text>
                </MotionPressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

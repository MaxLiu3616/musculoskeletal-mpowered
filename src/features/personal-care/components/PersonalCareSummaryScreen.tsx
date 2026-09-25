import ScreenHeader from '@/components/ScreenHeader';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import { AppText as Text } from '@/components/typography';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import {
  findGeneralActivityLabel,
  findPersonalCareLabel,
  findSleepLabel,
  getPersonalCareSummaryDescription,
  getPersonalCareTotalScore,
  personalCareAssessmentCopy,
} from '@/features/personal-care/definitions/PersonalCareAssessment.data';

import { styles } from './PersonalCareAssessmentScreen.styles';

type PersonalCareSummaryScreenProps = {
  periodLabel: string;
  onBack: () => void;
  onClose: () => void;
  onExploreTips: () => void;
};

export default function PersonalCareSummaryScreen({
  periodLabel,
  onBack,
  onClose,
  onExploreTips,
}: PersonalCareSummaryScreenProps) {
  const { responses } =
    usePersonalCareAssessment();

  const generalActivityLabels =
    responses.generalActivityImpacts.map(
      (id) =>
        findGeneralActivityLabel(id) ??
        id,
    );

  const personalCareLabel =
    responses.personalCare
      ? findPersonalCareLabel(
          responses.personalCare,
        )
      : null;

  const sleepLabel =
    responses.sleep
      ? findSleepLabel(
          responses.sleep,
        )
      : null;

  const totalScore =
    getPersonalCareTotalScore(
      responses.generalActivityImpacts,
      responses.personalCare,
      responses.sleep,
    );

  const description =
    getPersonalCareSummaryDescription(
      totalScore,
    );

  const reflection =
    responses.reflection.trim();

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
              <ScreenHeader title="Personal care summary" eyebrow="Weekly check-in" onBack={onBack} />
            </View>

            <Text
              style={styles.summaryIntro}
            >
              {
                personalCareAssessmentCopy.summaryIntro
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
                    personalCareAssessmentCopy.summaryTitle
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
                Summary
              </Text>

              <View
                style={
                  styles.summaryHighlightBox
                }
              >
                <Text
                  style={
                    styles.summaryHighlightText
                  }
                >
                  {description.firstLine}{' '}
                  <Text
                    style={
                      styles.summaryHighlightBold
                    }
                  >
                    {
                      description.boldPhrase
                    }
                  </Text>{' '}
                  {description.secondLine}
                </Text>

                <Pressable
                  accessibilityRole="link"
                  onPress={onExploreTips}
                  style={({ pressed }) => [
                    styles.exploreTipsButton,
                    pressed &&
                      styles.exploreTipsButtonPressed,
                  ]}
                >
                  <Ionicons
                    name="search-outline"
                    size={15}
                    color={colors.ink}
                  />

                  <Text
                    style={
                      styles.exploreTipsText
                    }
                  >
                    Explore tips on daily
                    living
                  </Text>
                </Pressable>
              </View>

              <View
                style={
                  styles.summaryResultsSection
                }
              >
                <Text
                  style={
                    styles.summarySectionTitle
                  }
                >
                  My results:
                </Text>

                <View
                  style={
                    styles.summaryResultsContent
                  }
                >
                  <View
                    style={
                      styles.summaryResultGroup
                    }
                  >
                    <Text
                      style={
                        styles.summaryItem
                      }
                    >
                      General Activities:
                    </Text>

                    <Text
                      style={
                        styles.summaryText
                      }
                    >
                      {generalActivityLabels.length >
                      0
                        ? `${generalActivityLabels.join(
                            ', ',
                          )}.`
                        : 'No impacts selected.'}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.summaryResultGroup
                    }
                  >
                    <Text
                      style={
                        styles.summaryItem
                      }
                    >
                      Personal care
                      (washing, dressing,
                      etc):
                    </Text>

                    <Text
                      style={
                        styles.summaryText
                      }
                    >
                      {personalCareLabel
                        ? `${personalCareLabel}.`
                        : 'Not recorded.'}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.summaryResultGroup
                    }
                  >
                    <Text
                      style={
                        styles.summaryItem
                      }
                    >
                      Sleeping:
                    </Text>

                    <Text
                      style={
                        styles.summaryText
                      }
                    >
                      {sleepLabel
                        ? `${sleepLabel}.`
                        : 'Not recorded.'}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={
                  styles.summaryReflectionSection
                }
              >
                <Text
                  style={
                    styles.summarySectionTitle
                  }
                >
                  My reflections:
                </Text>

                <View
                  style={
                    styles.summaryReflectionContent
                  }
                >
                  <Text
                    style={
                      styles.summaryText
                    }
                  >
                    {reflection ||
                      'No reflection recorded.'}
                  </Text>
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
                  style={styles.sessionNote}
                >
                  {
                    personalCareAssessmentCopy.summarySessionNote
                  }
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={onClose}
                  style={({ pressed }) => [
                    styles.summaryCloseButton,
                    pressed &&
                      styles.summaryCloseButtonPressed,
                  ]}
                >
                  <Text
                    style={
                      styles.summaryCloseButtonText
                    }
                  >
                    {
                      personalCareAssessmentCopy.closeLabel
                    }
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

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

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import {
  findPainCharacteristicLabel,
  findPainLocationLabel,
  getAssessmentPeriodLabel,
  getPainSummaryDescription,
  painAssessmentCopy,
} from '@/features/pain-tracker/definitions/PainAssessment.data';

import { styles } from './PainAssessmentScreen.styles';

type PainAssessmentSummaryScreenProps = {
  onBack: () => void;
  onClose: () => void;
};

export default function PainAssessmentSummaryScreen({
  onBack,
  onClose,
}: PainAssessmentSummaryScreenProps) {
  const { height: viewportHeight } =
    useWindowDimensions();

  const appHeight =
    Platform.OS === 'web'
      ? Math.min(viewportHeight, 844)
      : viewportHeight;

  const { responses } =
    usePainAssessment();

  const locationLabels =
    responses.locations.map(
      (locationId) =>
        locationId === 'other'
          ? `Other: ${responses.otherLocation}`
          : (
              findPainLocationLabel(
                locationId,
              ) ?? locationId
            ),
    );

  const characteristicLabels =
    responses.characteristics.map(
      (characteristicId) =>
        findPainCharacteristicLabel(
          characteristicId,
        ) ?? characteristicId,
    );

  const characteristicVerb =
    characteristicLabels.length > 1
      ? 'were'
      : 'was';

  const intensityResponses = [
    {
      label: 'Current pain',
      key: 'currentPain',
      value: responses.currentPain,
    },
    {
      label: 'Mildest pain',
      key: 'mildestPain',
      value: responses.mildestPain,
    },
    {
      label: 'Worst pain',
      key: 'worstPain',
      value: responses.worstPain,
    },
    {
      label: 'Average pain',
      key: 'averagePain',
      value: responses.averagePain,
    },
  ] as const;

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
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />

        <ScrollView
          contentContainerStyle={
            styles.summaryScrollContent
          }
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
                  pressed &&
                    styles.backButtonPressed,
                ]}
              >
                <Text
                  style={styles.backButtonText}
                >
                  {
                    painAssessmentCopy.backLabel
                  }
                </Text>
              </Pressable>

              <Text
                style={styles.trackerTitle}
              >
                {
                  painAssessmentCopy.trackerTitle
                }
              </Text>
            </View>

            <Text
              style={styles.assessmentTitle}
            >
              {
                painAssessmentCopy.summaryTitle
              }
            </Text>

            <Text
              style={styles.summaryIntro}
            >
              {
                painAssessmentCopy.summaryIntro
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
                    painAssessmentCopy.assessmentTitle
                  }
                </Text>

                <Text
                  style={styles.summaryPeriod}
                >
                  Period:{' '}
                  {getAssessmentPeriodLabel()}
                </Text>
              </View>

              <View
                style={styles.summaryDivider}
              />

              <View
                style={styles.summarySection}
              >
                <Text
                  style={
                    styles.summarySectionTitle
                  }
                >
                  Pain location
                </Text>

                <Text
                  style={styles.summaryText}
                >
                  I have pain in the following
                  areas:
                </Text>

                {locationLabels.map(
                  (label) => (
                    <Text
                      key={label}
                      style={styles.summaryItem}
                    >
                      • {label}
                    </Text>
                  ),
                )}
              </View>

              <View
                style={styles.summarySection}
              >
                <Text
                  style={
                    styles.summarySectionTitle
                  }
                >
                  Pain characteristics
                </Text>

                <Text
                  style={styles.summaryText}
                >
                  My pain {characteristicVerb}:{' '}
                  {characteristicLabels
                    .join(', ')
                    .toLowerCase()}
                  .
                </Text>
              </View>

              <View
                style={styles.summarySection}
              >
                <Text
                  style={
                    styles.summarySectionTitle
                  }
                >
                  Pain intensity
                </Text>

                {intensityResponses.map(
                  (response) => (
                    <View
                      key={response.label}
                      style={
                        styles.summaryIntensityItem
                      }
                    >
                      <Text
                        style={styles.summaryItem}
                      >
                        {response.label}:{' '}
                        <Text
                          style={styles.summaryValue}
                        >
                          {response.value ??
                            'Not recorded'}
                        </Text>
                      </Text>

                      {response.value ===
                      null ? null : (
                        <Text
                          style={styles.summaryText}
                        >
                          {getPainSummaryDescription(
                            response.key,
                            response.value,
                          )}
                          .
                        </Text>
                      )}
                    </View>
                  ),
                )}
              </View>

              <View
                style={styles.summaryFooter}
              >
                <Text
                  style={styles.sessionNote}
                >
                  {
                    painAssessmentCopy.summarySessionNote
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
                      painAssessmentCopy.closeLabel
                    }
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
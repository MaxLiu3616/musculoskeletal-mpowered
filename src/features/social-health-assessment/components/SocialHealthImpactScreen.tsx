import Slider from '@react-native-community/slider';
import { useState } from 'react';
import {
  type LayoutChangeEvent,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import {
  getSocialHealthImpactDescription,
  socialHealthAssessmentCopy,
} from '@/features/social-health-assessment/definitions/SocialHealthAssessment.data';
import type {
  SocialHealthImpactArea,
  SocialHealthImpactScore,
} from '@/features/social-health-assessment/types/SocialHealthAssessment';

import SocialHealthAssessmentScreen from './SocialHealthAssessmentScreen';
import { styles } from './SocialHealthImpactScreen.styles';

type SocialHealthImpactScreenProps = {
  area: SocialHealthImpactArea;
  onBack: () => void;
  onContinue: () => void;
  step: number;
};

const THUMB_WIDTH = 10;
const VALUE_BADGE_WIDTH = 28;

export default function SocialHealthImpactScreen({
  area,
  onBack,
  onContinue,
  step,
}: SocialHealthImpactScreenProps) {
  const {
    responses,
    updateImpact,
  } = useSocialHealthAssessment();

  const [selectedScore, setSelectedScore] =
    useState<SocialHealthImpactScore | null>(
      responses[area],
    );

  const [trackWidth, setTrackWidth] =
    useState(0);

  const sectionTitle =
    area === 'moodImpact'
      ? socialHealthAssessmentCopy.moodTitle
      : area === 'relationshipImpact'
        ? socialHealthAssessmentCopy.relationshipTitle
        : socialHealthAssessmentCopy.enjoymentTitle;

  const question =
    area === 'moodImpact'
      ? socialHealthAssessmentCopy.moodQuestion
      : area === 'relationshipImpact'
        ? socialHealthAssessmentCopy.relationshipQuestion
        : socialHealthAssessmentCopy.enjoymentQuestion;

  const canRecord =
    selectedScore !== null;

  const visualScore =
    selectedScore ?? 0;

  const setScore = (value: number) => {
    const roundedValue = Math.round(
      Math.min(10, Math.max(0, value)),
    ) as SocialHealthImpactScore;

    setSelectedScore(roundedValue);
  };

  const handleTextChange = (
    value: string,
  ) => {
    if (value.trim() === '') {
      setSelectedScore(null);
      return;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return;
    }

    setScore(numericValue);
  };

  const handleTrackLayout = (
    event: LayoutChangeEvent,
  ) => {
    setTrackWidth(
      event.nativeEvent.layout.width,
    );
  };

  const recordAnswer = () => {
    if (selectedScore === null) {
      return;
    }

    updateImpact(
      area,
      selectedScore,
    );

    onContinue();
  };

  const usableTrackWidth = Math.max(
    trackWidth - THUMB_WIDTH,
    0,
  );

  const thumbLeft =
    usableTrackWidth *
    (visualScore / 10);

  const thumbCenter =
    thumbLeft +
    THUMB_WIDTH / 2;

  const fillWidth =
    usableTrackWidth *
    (visualScore / 10);

  const valueBadgeLeft = Math.min(
    Math.max(
      thumbCenter -
        VALUE_BADGE_WIDTH / 2,
      0,
    ),
    Math.max(
      trackWidth - VALUE_BADGE_WIDTH,
      0,
    ),
  );

  return (
    <SocialHealthAssessmentScreen
      canRecord={canRecord}
      compactCard
      onBack={onBack}
      onRecord={recordAnswer}
      sectionTitle={sectionTitle}
      step={step}
      totalSteps={7}
    >
      <Text style={styles.question}>
        {question}
      </Text>

      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>
          My score is
        </Text>

        <TextInput
          accessibilityLabel={`${sectionTitle} score`}
          inputMode="numeric"
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={handleTextChange}
          placeholder="0 to 10"
          placeholderTextColor="#B8B4BB"
          style={styles.scoreInput}
          value={
            selectedScore === null
              ? ''
              : String(selectedScore)
          }
        />
      </View>

      <View
        onLayout={handleTrackLayout}
        style={styles.sliderContainer}
      >
        <View style={styles.sliderRail}>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderTrackFill,
                {
                  width: fillWidth,
                },
              ]}
            />
          </View>
        </View>

        {trackWidth > 0 ? (
          <>
            <View
              pointerEvents="none"
              style={[
                styles.valueBubble,
                {
                  left: valueBadgeLeft,
                },
              ]}
            >
              <Text
                style={
                  styles.valueBubbleText
                }
              >
                {visualScore}
              </Text>
            </View>

            <View
              pointerEvents="none"
              style={[
                styles.thumbBar,
                {
                  left: thumbLeft,
                },
              ]}
            />
          </>
        ) : null}

        <Slider
          accessibilityLabel={`${sectionTitle} slider`}
          maximumValue={10}
          minimumValue={0}
          onValueChange={setScore}
          step={1}
          style={styles.sliderInput}
          value={visualScore}
        />
      </View>

      <Text style={styles.description}>
        {getSocialHealthImpactDescription(
          area,
          visualScore,
        )}
      </Text>
    </SocialHealthAssessmentScreen>
  );
}
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import {
  Keyboard,
  type LayoutChangeEvent,
  Text,
  TextInput,
  View,
} from 'react-native';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import {
  getPainDescription,
  painAssessmentCopy,
  painIntensityQuestions,
} from '@/features/pain-tracker/definitions/PainAssessment.data';
import type { PainIntensityQuestionId } from '@/features/pain-tracker/types/PainAssessment';

import PainAssessmentScreen from './PainAssessmentScreen';
import { styles } from './PainAssessmentScreen.styles';

type PainIntensityScreenProps = {
  questionId: PainIntensityQuestionId;
  onBack: () => void;
  onContinue: () => void;
};

const THUMB_WIDTH = 10;
const VALUE_BADGE_WIDTH = 28;

export default function PainIntensityScreen({
  questionId,
  onBack,
  onContinue,
}: PainIntensityScreenProps) {
  const {
    responses,
    updateIntensity,
  } = usePainAssessment();

  const question =
    painIntensityQuestions[questionId];

  const savedValue =
    responses[question.responseKey];

  const [valueText, setValueText] =
    useState(
      savedValue === null
        ? ''
        : String(savedValue),
    );

  const [trackWidth, setTrackWidth] =
    useState(0);

  const isValidValue =
    /^(?:[0-9]|10)$/.test(valueText);

  const value = isValidValue
    ? Number(valueText)
    : 0;

  const updateValueText = (
    nextValue: string,
  ) => {
    const digits = nextValue
      .replace(/\D/g, '')
      .slice(0, 2);

    if (
      digits &&
      Number(digits) > 10
    ) {
      setValueText('10');
      return;
    }

    setValueText(digits);
  };

  const updateSliderValue = (
    nextValue: number,
  ) => {
    setValueText(
      String(Math.round(nextValue)),
    );
  };

  const handleTrackLayout = (
    event: LayoutChangeEvent,
  ) => {
    setTrackWidth(
      event.nativeEvent.layout.width,
    );
  };

  const recordIntensity = () => {
    if (!isValidValue) {
      return;
    }

    Keyboard.dismiss();

    updateIntensity(
      question.responseKey,
      value,
    );

    onContinue();
  };

  const renderPrompt = () => {
    if (questionId === 'mildest') {
      return (
        <Text style={styles.intensityPrompt}>
          My{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
            }}
          >
            mildest pain
          </Text>{' '}
          last week was
        </Text>
      );
    }

    if (questionId === 'worst') {
      return (
        <Text style={styles.intensityPrompt}>
          My{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
            }}
          >
            worst pain
          </Text>{' '}
          last week was
        </Text>
      );
    }

    if (questionId === 'average') {
      return (
        <Text style={styles.intensityPrompt}>
          My{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
            }}
          >
            average pain
          </Text>{' '}
          last week was
        </Text>
      );
    }

    return (
      <Text style={styles.intensityPrompt}>
        {question.prompt}
      </Text>
    );
  };

  const usableTrackWidth = Math.max(
    trackWidth - THUMB_WIDTH,
    0,
  );

  const thumbLeft =
    usableTrackWidth *
    (value / 10);

  const thumbCenter =
    thumbLeft + THUMB_WIDTH / 2;

  const fillWidth =
    usableTrackWidth *
    (value / 10);

  const valueBadgeLeft = Math.min(
    Math.max(
      thumbCenter -
        VALUE_BADGE_WIDTH / 2,
      0,
    ),
    Math.max(
      trackWidth -
        VALUE_BADGE_WIDTH,
      0,
    ),
  );

  return (
    <PainAssessmentScreen
      canRecord={isValidValue}
      compactCard
      onBack={onBack}
      onRecord={recordIntensity}
      sectionTitle={
        painAssessmentCopy.intensityTitle
      }
      step={question.step}
    >
      <View
        style={styles.intensityPromptRow}
      >
        {renderPrompt()}

        <TextInput
          accessibilityLabel={`${question.prompt}, 0 to 10`}
          inputMode="numeric"
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={updateValueText}
          onSubmitEditing={
            recordIntensity
          }
          placeholder="0 to 10"
          placeholderTextColor="#817B83"
          returnKeyType="done"
          selectionColor="#6D50AC"
          style={styles.intensityInput}
          value={valueText}
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
            {value}
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

        <Slider
          accessibilityLabel={`${question.prompt}, pain intensity slider`}
          accessibilityValue={{
            max: 10,
            min: 0,
            now: value,
            text: getPainDescription(
              value,
              question.usesPastTense,
            ),
          }}
          maximumValue={10}
          minimumValue={0}
          onValueChange={
            updateSliderValue
          }
          step={1}
          style={styles.sliderInput}
          value={value}
        />
      </View>

      <Text
        accessibilityLiveRegion="polite"
        style={styles.painDescription}
      >
        {getPainDescription(
          value,
          question.usesPastTense,
        )}
      </Text>
    </PainAssessmentScreen>
  );
}
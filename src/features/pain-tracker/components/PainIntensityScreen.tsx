import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Keyboard, Text, TextInput, View } from 'react-native';

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

export default function PainIntensityScreen({
  questionId,
  onBack,
  onContinue,
}: PainIntensityScreenProps) {
  const { responses, updateIntensity } = usePainAssessment();
  const question = painIntensityQuestions[questionId];
  const savedValue = responses[question.responseKey];
  const [valueText, setValueText] = useState(String(savedValue ?? 0));
  const isValidValue = /^(?:[0-9]|10)$/.test(valueText);
  const value = isValidValue ? Number(valueText) : 0;

  const updateValueText = (nextValue: string) => {
    const digits = nextValue.replace(/\D/g, '').slice(0, 2);

    if (Number(digits) > 10) {
      setValueText('10');
      return;
    }

    setValueText(digits);
  };

  const updateSliderValue = (nextValue: number) => {
    setValueText(String(nextValue));
  };

  const recordIntensity = () => {
    if (!isValidValue) {
      return;
    }

    Keyboard.dismiss();
    updateIntensity(question.responseKey, value);
    onContinue();
  };

  return (
    <PainAssessmentScreen
      canRecord={isValidValue}
      onBack={onBack}
      onRecord={recordIntensity}
      sectionTitle={painAssessmentCopy.intensityTitle}
      step={question.step}
    >
      <View style={styles.intensityPromptRow}>
        <Text style={styles.intensityPrompt}>{question.prompt}</Text>
        <TextInput
          accessibilityLabel={`${question.prompt}, 0 to 10`}
          inputMode="numeric"
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={updateValueText}
          onSubmitEditing={recordIntensity}
          returnKeyType="done"
          selectionColor="#6D50AC"
          style={styles.intensityInput}
          value={valueText}
        />
        <Text style={styles.intensityPrompt}>
          {painAssessmentCopy.intensityRange}
        </Text>
      </View>

      <Slider
        accessibilityLabel={`${question.prompt}, pain intensity slider`}
        accessibilityValue={{
          max: 10,
          min: 0,
          now: value,
          text: isValidValue
            ? getPainDescription(value, question.usesPastTense)
            : undefined,
        }}
        maximumTrackTintColor="#DDD5E5"
        maximumValue={10}
        minimumTrackTintColor="#6D50AC"
        minimumValue={0}
        onValueChange={updateSliderValue}
        step={1}
        style={styles.slider}
        thumbTintColor="#6D50AC"
        value={value}
      />

      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>0 - No pain</Text>
        <Text style={styles.scaleLabel}>10 - Worst imaginable</Text>
      </View>

      <Text accessibilityLiveRegion="polite" style={styles.painDescription}>
        {isValidValue
          ? getPainDescription(value, question.usesPastTense)
          : 'Enter a value from 0 to 10'}
      </Text>
    </PainAssessmentScreen>
  );
}

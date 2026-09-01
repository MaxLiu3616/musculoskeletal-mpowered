import { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import { socialHealthAssessmentCopy } from '@/features/social-health-assessment/definitions/SocialHealthAssessment.data';

import SocialHealthAssessmentScreen from './SocialHealthAssessmentScreen';
import { styles } from './SocialHealthReflectionScreen.styles';

type SocialHealthReflectionScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function SocialHealthReflectionScreen({
  onBack,
  onContinue,
}: SocialHealthReflectionScreenProps) {
  const {
    responses,
    updateReflection,
  } = useSocialHealthAssessment();

  const [reflection, setReflection] =
    useState(responses.reflection);

  const recordReflection = () => {
    updateReflection(reflection);
    onContinue();
  };

  return (
    <SocialHealthAssessmentScreen
      canRecord
      compactCard
      onBack={onBack}
      onRecord={recordReflection}
      sectionTitle={
        socialHealthAssessmentCopy.moodTitle
      }
      step={7}
      totalSteps={7}
    >
      <Text style={styles.question}>
        {
          socialHealthAssessmentCopy.reflectionQuestion
        }
      </Text>

      <TextInput
        accessibilityLabel="Social health reflection"
        multiline
        onChangeText={setReflection}
        placeholder={
          socialHealthAssessmentCopy.reflectionHelper
        }
        placeholderTextColor="#A6A0A9"
        style={styles.input}
        textAlignVertical="top"
        value={reflection}
      />
    </SocialHealthAssessmentScreen>
  );
}
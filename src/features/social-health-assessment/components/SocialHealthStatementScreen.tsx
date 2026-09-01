import { useState } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import {
  socialHealthAssessmentCopy,
  socialLifeOptions,
  travellingOptions,
} from '@/features/social-health-assessment/definitions/SocialHealthAssessment.data';
import type { SocialHealthStatementScore } from '@/features/social-health-assessment/types/SocialHealthAssessment';

import SocialHealthAssessmentScreen from './SocialHealthAssessmentScreen';
import { styles } from './SocialHealthStatementScreen.styles';

type SocialHealthStatementArea =
  | 'socialLife'
  | 'travelling';

type SocialHealthStatementScreenProps = {
  area: SocialHealthStatementArea;
  onBack: () => void;
  onContinue: () => void;
  step: number;
};

export default function SocialHealthStatementScreen({
  area,
  onBack,
  onContinue,
  step,
}: SocialHealthStatementScreenProps) {
  const {
    responses,
    updateSocialLife,
    updateTravelling,
  } = useSocialHealthAssessment();

  const [selectedScore, setSelectedScore] =
    useState<SocialHealthStatementScore | null>(
      responses[area],
    );

  const isSocialLife =
    area === 'socialLife';

  const sectionTitle = isSocialLife
    ? socialHealthAssessmentCopy.socialLifeTitle
    : socialHealthAssessmentCopy.travellingTitle;

  const options = isSocialLife
    ? socialLifeOptions
    : travellingOptions;

  const canRecord =
    selectedScore !== null;

  const recordAnswer = () => {
    if (selectedScore === null) {
      return;
    }

    if (isSocialLife) {
      updateSocialLife(selectedScore);
    } else {
      updateTravelling(selectedScore);
    }

    onContinue();
  };

  return (
    <SocialHealthAssessmentScreen
      canRecord={canRecord}
      onBack={onBack}
      onRecord={recordAnswer}
      sectionTitle={sectionTitle}
      step={step}
      totalSteps={7}
    >
      <Text style={styles.instruction}>
        Select the{' '}
        <Text style={styles.instructionEmphasis}>
          MOST
        </Text>{' '}
        relevant statement:
      </Text>

      <View style={styles.optionList}>
        {options.map((option, index) => {
          const isSelected =
            selectedScore === option.score;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{
                checked: isSelected,
              }}
              key={option.score}
              onPress={() =>
                setSelectedScore(option.score)
              }
              style={({ pressed }) => [
                styles.optionRow,
                index ===
                  options.length - 1 &&
                  styles.optionRowLast,
                isSelected &&
                  styles.optionRowSelected,
                pressed &&
                  styles.optionRowPressed,
              ]}
            >
              <View
                style={[
                  styles.radio,
                  isSelected &&
                    styles.radioSelected,
                ]}
              >
                {isSelected ? (
                  <View
                    style={styles.radioDot}
                  />
                ) : null}
              </View>

              <Text style={styles.optionText}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SocialHealthAssessmentScreen>
  );
}
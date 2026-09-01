import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import {
  generalMoodOptions,
  socialHealthAssessmentCopy,
} from '@/features/social-health-assessment/definitions/SocialHealthAssessment.data';
import type { GeneralMoodId } from '@/features/social-health-assessment/types/SocialHealthAssessment';

import SocialHealthAssessmentScreen from './SocialHealthAssessmentScreen';
import { styles } from './SocialHealthMoodScreen.styles';

type SocialHealthMoodScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

type MoodIconConfig = {
  selectedIcon:
    React.ComponentProps<
      typeof MaterialCommunityIcons
    >['name'];
  unselectedIcon:
    React.ComponentProps<
      typeof MaterialCommunityIcons
    >['name'];
  selectedColor: string;
};

const moodIcons: Record<
  GeneralMoodId,
  MoodIconConfig
> = {
  frustrated: {
    selectedIcon: 'emoticon-angry',
    unselectedIcon: 'emoticon-angry-outline',
    selectedColor: '#E88181',
  },

  sad: {
    selectedIcon: 'emoticon-sad',
    unselectedIcon: 'emoticon-sad-outline',
    selectedColor: '#6EA6DD',
  },

  okay: {
    selectedIcon: 'emoticon-neutral',
    unselectedIcon: 'emoticon-neutral-outline',
    selectedColor: '#E7B56A',
  },

  calm: {
    selectedIcon: 'emoticon-happy',
    unselectedIcon: 'emoticon-happy-outline',
    selectedColor: '#F0D565',
  },

  delighted: {
    selectedIcon: 'emoticon-excited',
    unselectedIcon: 'emoticon-excited-outline',
    selectedColor: '#F2D300',
  },
};

export default function SocialHealthMoodScreen({
  onBack,
  onContinue,
}: SocialHealthMoodScreenProps) {
  const {
    responses,
    updateGeneralMood,
  } = useSocialHealthAssessment();

  const [selectedMood, setSelectedMood] =
    useState<GeneralMoodId | null>(
      responses.generalMood,
    );

  const canRecord =
    selectedMood !== null;

  const selectedMoodLabel =
    selectedMood === null
      ? null
      : generalMoodOptions.find(
          (option) =>
            option.id === selectedMood,
        )?.label ?? null;

  const recordMood = () => {
    if (selectedMood === null) {
      return;
    }

    updateGeneralMood(selectedMood);
    onContinue();
  };

  return (
    <SocialHealthAssessmentScreen
      canRecord={canRecord}
      compactCard
      onBack={onBack}
      onRecord={recordMood}
      sectionTitle={
        socialHealthAssessmentCopy.moodTitle
      }
      step={6}
      totalSteps={7}
    >
      <Text style={styles.question}>
        {
          socialHealthAssessmentCopy.generalMoodQuestion
        }
      </Text>

      <Text style={styles.helper}>
        {
          socialHealthAssessmentCopy.generalMoodHelper
        }
      </Text>

      <View style={styles.moodRow}>
        {generalMoodOptions.map(
          (option) => {
            const isSelected =
              selectedMood === option.id;

            const icon =
              moodIcons[option.id];

            return (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{
                  checked: isSelected,
                }}
                key={option.id}
                onPress={() =>
                  setSelectedMood(
                    option.id,
                  )
                }
                style={({ pressed }) => [
                  styles.moodButton,
                  pressed &&
                    styles.moodButtonPressed,
                ]}
              >
                <MaterialCommunityIcons
                  color={
                    isSelected
                      ? icon.selectedColor
                      : '#77717B'
                  }
                  name={
                    isSelected
                      ? icon.selectedIcon
                      : icon.unselectedIcon
                  }
                  size={28}
                />
              </Pressable>
            );
          },
        )}
      </View>

      <Text
        style={[
          styles.moodValue,
          selectedMood !== null &&
            styles.moodValueSelected,
        ]}
      >
        {selectedMoodLabel ??
          'String value'}
      </Text>
    </SocialHealthAssessmentScreen>
  );
}
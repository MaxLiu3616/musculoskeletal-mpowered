import { View } from 'react-native';
import MotionPressable from '@/components/motion/MotionPressable';

import { AppText as Text } from '@/components/typography';

import {
  homeSummaryCopy,
  type HomeSummaryItem,
} from './HomeSummaryCard.data';

import { styles } from './HomeSummaryCard.styles';

type HomeSummaryCardProps = {
  item: HomeSummaryItem;
  onPress?: () => void;
};

export default function HomeSummaryCard({
  item,
  onPress,
}: HomeSummaryCardProps) {
  const content =
    item.type === 'health-profile'
      ? homeSummaryCopy.healthProfile
      : homeSummaryCopy.personalisedQuestions;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {content.title}
      </Text>

      {item.updatedAt ? (
        <Text style={styles.updatedAt}>
          {homeSummaryCopy.updatedLabel}{' '}
          {item.updatedAt}
        </Text>
      ) : null}

      <MotionPressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
      >
        <Text style={styles.actionText}>
          {content.actionLabel}
        </Text>
      </MotionPressable>
    </View>
  );
}

import { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

import HomeSummaryCard from './HomeSummaryCard';
import type {
  HomeSummaryItem,
  HomeSummaryType,
} from './HomeSummaryCard.data';

import { styles } from './HomeSummarySwipe.styles';

type HomeSummarySwipeProps = {
  items: HomeSummaryItem[];

  onItemPress?: (
    type: HomeSummaryType,
  ) => void;
};

const CARD_WIDTH = 300;
const CARD_GAP = 12;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

export default function HomeSummarySwipe({
  items,
  onItemPress,
}: HomeSummarySwipeProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  if (items.length === 0) {
    return null;
  }

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const nextIndex = Math.round(
      offsetX / SNAP_INTERVAL,
    );

    const safeIndex = Math.max(
      0,
      Math.min(
        nextIndex,
        items.length - 1,
      ),
    );

    if (safeIndex !== activeIndex) {
      setActiveIndex(safeIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        decelerationRate="fast"
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={SNAP_INTERVAL}
      >
        {items.map((item) => (
          <HomeSummaryCard
            item={item}
            key={item.type}
            onPress={() =>
              onItemPress?.(item.type)
            }
          />
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {items.map((item, index) => (
          <View
            key={`${item.type}-dot`}
            style={[
              styles.dot,
              index === activeIndex &&
                styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
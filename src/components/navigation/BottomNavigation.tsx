import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Keyboard, Platform, Pressable, View } from 'react-native';

import { useReducedMotion } from '@/components/motion/MotionProvider';
import { useAssessmentTransition } from '@/components/motion/AssessmentTransitionContext';
import { AppText as Text } from '@/components/typography';
import { colors } from '@/theme';
import { bottomNavigationItems, type BottomNavigationId } from './BottomNavigation.data';
import { styles } from './BottomNavigation.styles';

export default function BottomNavigation({ activeItem }: { activeItem: BottomNavigationId }) {
  const reducedMotion = useReducedMotion();
  const { busy } = useAssessmentTransition();
  const activeIndex = bottomNavigationItems.findIndex(item => item.id === activeItem);
  const position = useRef(new Animated.Value(activeIndex)).current;
  const [width, setWidth] = useState(0);
  const itemWidth = (width - styles.container.paddingHorizontal * 2) / bottomNavigationItems.length;

  useEffect(() => {
    if (reducedMotion !== false) {
      position.setValue(activeIndex);
      return;
    }
    const animation = Animated.timing(position, {
      toValue: activeIndex, duration: 280, easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [activeIndex, position, reducedMotion]);

  return (
    <View accessibilityRole="tablist" accessibilityLabel="Main navigation" style={styles.container}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      {bottomNavigationItems.map((item) => {
        const isActive = item.id === activeItem;
        return (
          <Pressable accessibilityRole="tab" accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive, disabled: busy }} aria-selected={isActive} disabled={busy}
            key={item.id} onPress={() => { Keyboard.dismiss(); router.navigate(item.href); }}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
            <View style={styles.iconContainer}>
              <Ionicons color={isActive ? colors.ink : colors.muted} name={item.icon} size={24} />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
      {width > 0 ? <Animated.View accessible={false} testID="navigation-indicator"
        style={[styles.activeIndicator, {
          left: styles.container.paddingHorizontal + (itemWidth - styles.activeIndicator.width) / 2,
          transform: [{ translateX: position.interpolate({
            inputRange: [0, bottomNavigationItems.length - 1],
            outputRange: [0, itemWidth * (bottomNavigationItems.length - 1)],
          }) }],
        }]} /> : null}
    </View>
  );
}

import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Animated, Easing, Platform } from 'react-native';

import { useReducedMotion } from './MotionProvider';

export default function useStaggeredEntrance(enabled = true) {
  const reducedMotion = useReducedMotion();
  const entered = useRef(false);
  const entrance = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => {
    if (!enabled || reducedMotion === null) return;
    if (reducedMotion) {
      entered.current = true;
      entrance.setValue(1);
      return;
    }
    if (entered.current) return;
    entered.current = true;
    const animation = Animated.timing(entrance, {
      toValue: 1, duration: 440, easing: Easing.linear,
      useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    });
    animation.start();
    return () => { animation.stop(); entrance.setValue(1); };
  }, [enabled, entrance, reducedMotion]));

  return (index: number) => {
    const delay = Math.min(index, 6) * 0.075;
    const progress = entrance.interpolate({
      inputRange: [delay, delay + 0.55], outputRange: [0, 1],
      extrapolate: 'clamp', easing: Easing.out(Easing.cubic),
    });
    return {
      opacity: reducedMotion || !enabled ? 1 : progress,
      transform: [{ translateY: reducedMotion || !enabled ? 0 : progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
    };
  };
}

import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform } from 'react-native';

import { useReducedMotion } from '@/components/motion/MotionProvider';
import { useAssessmentTransition } from '@/components/motion/AssessmentTransitionContext';
import useStaggeredEntrance from '@/components/motion/useStaggeredEntrance';
import { homeAssessments, type HomeAssessmentId, type HomeAssessmentStatus } from './HomeScreen.data';

export default function useHomeMotion(status: Record<HomeAssessmentId, HomeAssessmentStatus>) {
  const reducedMotion = useReducedMotion();
  const { scene } = useAssessmentTransition();
  const returnedFromAssessment = useRef(false);
  if (scene?.direction === 'close') returnedFromAssessment.current = true;
  const [focused, setFocused] = useState(false);
  const entranceStyle = useStaggeredEntrance(!returnedFromAssessment.current);
  const completion = useRef(homeAssessments.map(item => new Animated.Value(status[item.id].completed ? 1 : 0))).current;
  const completedKey = homeAssessments.map(item => status[item.id].completed ? '1' : '0').join('');

  useFocusEffect(useCallback(() => {
    setFocused(true);
    return () => setFocused(false);
  }, []));

  useEffect(() => {
    // Wait until Home is visible so completion is not spent behind the summary.
    if (!focused || reducedMotion === null) return;
    const animations = completion.map((value, index) => {
      const target = Number(completedKey[index]);
      if (reducedMotion) {
        value.setValue(target);
        return null;
      }
      const animation = Animated.timing(value, {
        toValue: target, duration: 420, easing: Easing.out(Easing.quad),
        useNativeDriver: Platform.OS !== 'web', isInteraction: false,
      });
      animation.start();
      return animation;
    });
    return () => animations.forEach(animation => animation?.stop());
  }, [completedKey, completion, focused, reducedMotion]);

  return { completion, entranceStyle };
}

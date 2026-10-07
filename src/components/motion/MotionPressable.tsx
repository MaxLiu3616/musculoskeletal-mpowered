import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, Platform, Pressable, type PressableProps } from 'react-native';

import { useReducedMotion } from './MotionProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PressProgressContext = createContext<Animated.Value | null>(null);

export default function MotionPressable({
  children, style, disabled, onPressIn, onPressOut, onBlur, onHoverIn, onHoverOut, ...props
}: PressableProps) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (reducedMotion !== false || disabled) {
      progress.stopAnimation();
      progress.setValue(0);
      setPressed(false);
    }
    return () => progress.stopAnimation();
  }, [disabled, progress, reducedMotion]);

  const animatePress = (down: boolean) => {
    setPressed(down);
    if (reducedMotion !== false || disabled) return;
    const animation = down
      ? Animated.timing(progress, { toValue: 1, duration: 90, easing: Easing.out(Easing.quad), useNativeDriver: Platform.OS !== 'web' })
      : Animated.spring(progress, { toValue: 0, speed: 32, bounciness: 3, useNativeDriver: Platform.OS !== 'web' });
    animation.start();
  };

  return (
    <AnimatedPressable
      {...props}
      disabled={disabled}
      onPressIn={event => { animatePress(true); onPressIn?.(event); }}
      onPressOut={event => { animatePress(false); onPressOut?.(event); }}
      onBlur={event => { animatePress(false); onBlur?.(event); }}
      onHoverIn={event => { setHovered(true); onHoverIn?.(event); }}
      onHoverOut={event => { setHovered(false); onHoverOut?.(event); }}
      style={[
        typeof style === 'function' ? style({ pressed, hovered }) : style,
        { transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.98] }) }] },
      ]}
    >
      <PressProgressContext.Provider value={progress}>
        {typeof children === 'function' ? children({ pressed, hovered }) : children}
      </PressProgressContext.Provider>
    </AnimatedPressable>
  );
}

export function MotionArrow({ children }: { children: ReactNode }) {
  const progress = useContext(PressProgressContext);
  return (
    <Animated.View style={{ transform: [{ translateX: progress?.interpolate({ inputRange: [0, 1], outputRange: [0, 3] }) ?? 0 }] }}>
      {children}
    </Animated.View>
  );
}

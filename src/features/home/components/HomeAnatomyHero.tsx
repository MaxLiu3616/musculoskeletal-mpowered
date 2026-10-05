import { useId, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { useReducedMotion } from '@/components/motion/MotionProvider';
import { TABLET_BREAKPOINT } from '@/components/layout';
import { styles } from './HomeScreen.styles';

export default function HomeAnatomyHero({ scrollY, children }: { scrollY: Animated.Value; children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const gradientId = useId();
  const [height, setHeight] = useState(246);
  const travel = (distance: number) => reducedMotion !== false ? 0 : scrollY.interpolate({
    inputRange: [0, height], outputRange: [0, distance], extrapolate: 'clamp',
  });

  return (
    <View testID="home-anatomy-hero" style={[styles.hero, isTablet && art.tabletHero]} onLayout={event => setHeight(event.nativeEvent.layout.height)}>
      <View style={art.clip} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden>
        <Animated.View testID="anatomy-backdrop" style={[art.backdrop, { top: -height / 2, bottom: -height / 2, transform: [{ translateY: travel(height * 0.5) }] }]}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id={`${gradientId}-peach`} x1="0%" y1="0%" x2="85%" y2="100%">
                <Stop offset="0" stopColor="#FFF0E6" />
                <Stop offset="0.5" stopColor="#FBE0D0" />
                <Stop offset="1" stopColor="#F4CEB9" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${gradientId}-peach)`} />
          </Svg>
        </Animated.View>
        <Animated.View testID="anatomy-blue-shape" style={[art.layer, { transform: [{ translateY: travel(height * 0.3) }, { translateX: travel(8) }] }]}>
          <Svg width="100%" height="100%" viewBox="0 0 1580 996" preserveAspectRatio="xMidYMid slice">
            <Defs>
              <LinearGradient id={`${gradientId}-blue`} x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0" stopColor="#24569C" />
                <Stop offset="1" stopColor="#123C81" />
              </LinearGradient>
            </Defs>
            <Path d="M1580 60H1350C1096 60 891 267 891 510V996H1580Z" fill={`url(#${gradientId}-blue)`} />
          </Svg>
        </Animated.View>
        <Animated.Image testID="anatomy-foreground" accessible={false}
          source={require('../../../../assets/images/home-anatomy-foreground.png')} resizeMode="cover"
          style={[art.layer, { transform: [{ translateY: travel(height * 0.12) }, { translateX: travel(-8) }, {
            scale: reducedMotion !== false ? 1 : scrollY.interpolate({ inputRange: [0, height], outputRange: [1, 1.06], extrapolate: 'clamp' }),
          }] }]} />
      </View>
      {children}
    </View>
  );
}

const art = StyleSheet.create({
  tabletHero: { minHeight: 330, borderRadius: 20, overflow: 'hidden' },
  clip: { ...StyleSheet.absoluteFill, overflow: 'hidden', pointerEvents: 'none' },
  backdrop: { position: 'absolute', left: 0, right: 0 },
  layer: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
});

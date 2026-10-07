import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { MotionArrow } from '@/components/motion/MotionPressable';
import { colors } from '@/theme';
import { styles } from './HomeScreen.styles';

export default function HomeAssessmentArrow({ completion, style }: { completion: Animated.Value; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.assessmentArrow, style]} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden>
      <MotionArrow>
        <Animated.View style={{ opacity: completion.interpolate({ inputRange: [0, 0.45], outputRange: [1, 0], extrapolate: 'clamp' }) }}>
          <MaterialCommunityIcons name="arrow-right" color={colors.ink} size={21} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, {
          opacity: completion,
          transform: [{ scale: completion.interpolate({ inputRange: [0, 0.7, 0.86, 1], outputRange: [0.7, 0.7, 1.12, 1] }) }],
        }]}>
          <MaterialCommunityIcons name="check" color={colors.ink} size={21} />
        </Animated.View>
      </MotionArrow>
    </View>
  );
}

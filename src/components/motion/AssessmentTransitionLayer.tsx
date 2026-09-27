import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated, StyleSheet, View } from 'react-native';

import { homeAssessments } from '@/features/home/components/HomeScreen.data';
import { colors, fonts } from '@/theme';
import ScreenHeader from '../ScreenHeader';
import { AppText as Text } from '../typography';
import { useAssessmentTransition, type MorphBox } from './AssessmentTransitionContext';

export default function AssessmentTransitionLayer() {
  const { busy, scene, progress, reveal, viewportRef, onViewportLayout, targetReady } = useAssessmentTransition();
  const item = homeAssessments.find(item => item.id === scene?.id);
  const interpolate = (from: number, to: number) => progress.interpolate({ inputRange: [0, 1], outputRange: [from, to] });
  const headerOpacity = progress.interpolate({ inputRange: [0, 0.55, 0.85, 1], outputRange: [0, 0, 1, 1] });
  const tileOpacity = progress.interpolate({ inputRange: [0, 0.55, 0.85, 1], outputRange: [1, 1, 0, 0] });
  const visibility = progress.interpolate({ inputRange: [0, 0.08, 1], outputRange: [0, 1, 1] });
  const position = (from: MorphBox, to: MorphBox) => ({
    left: interpolate(from.x - scene!.viewport.x, to.x - scene!.viewport.x),
    top: interpolate(from.y - scene!.viewport.y, to.y - scene!.viewport.y),
  });

  return (
    <View ref={viewportRef} collapsable={false} onLayout={onViewportLayout}
      accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden
      style={[StyleSheet.absoluteFill, styles.layer, { pointerEvents: busy ? 'auto' : 'none' }]}>
      {scene && item && <>
        {scene.direction === 'open' && scene.phase === 'measure' && <View style={styles.probe}>
          <ScreenHeader title={item.label} compact eyebrow="Weekly check-in" onBack={() => {}} onTransitionMeasured={targetReady} />
        </View>}
        {scene.header && <Animated.View testID="assessment-morph" style={[StyleSheet.absoluteFill, {
          opacity: Animated.multiply(visibility, reveal.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })),
        }]}>
          <Animated.View testID="assessment-morph-surface" style={[styles.surface, {
            ...position(scene.tile.card, scene.viewport),
            width: interpolate(scene.tile.card.width, scene.viewport.width),
            height: interpolate(scene.tile.card.height, scene.viewport.height),
            borderRadius: interpolate(10, 0),
            backgroundColor: progress.interpolate({ inputRange: [0, 1], outputRange: [item.backgroundColor, colors.canvas] }),
          }]} />
          {[false, true].map(header => {
            const iconSize = header ? 28 : item.id === 'personal-care' || item.id === 'social-health' ? 30 : 36;
            const color = header ? colors.ink : item.color;
            return <Animated.View key={`icon-${header}`} testID={header ? 'assessment-morph-header-icon' : undefined}
              style={[styles.element, position(scene.tile.icon, scene.header!.icon), {
                opacity: header ? headerOpacity : tileOpacity,
                transform: [{ scale: interpolate(scene.tile.icon.height / iconSize, scene.header!.icon.height / iconSize) }],
              }]}>
              {item.id === 'personal-care'
                ? <MaterialCommunityIcons name={item.icon} size={iconSize} color={color} style={{ lineHeight: iconSize }} />
                : <Ionicons name={item.icon} size={iconSize} color={color} style={{ lineHeight: iconSize }} />}
            </Animated.View>;
          })}
          <Animated.View style={[styles.element, position(scene.tile.title, scene.header.title), {
            opacity: tileOpacity, width: scene.tile.title.width,
            transform: [{ scale: interpolate(1, scene.header.fontSize / 16) }],
          }]}>
            <Text style={{ color: item.color, fontFamily: fonts.strong, fontSize: 16, lineHeight: 21, letterSpacing: -0.4 }}>{item.label}</Text>
          </Animated.View>
          <Animated.View testID="assessment-morph-header-title" style={[styles.element, position(scene.tile.title, scene.header.title), {
            opacity: headerOpacity, width: scene.header.title.width,
            transform: [{ scale: interpolate(16 / scene.header.fontSize, 1) }],
          }]}>
            <Text style={{ color: colors.ink, fontFamily: fonts.display, fontSize: scene.header.fontSize, lineHeight: scene.header.lineHeight, letterSpacing: -0.7 }}>{scene.header.text}</Text>
          </Animated.View>
        </Animated.View>}
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { zIndex: 10, overflow: 'hidden' },
  probe: { opacity: 0, width: '100%', position: 'absolute', top: 0 },
  surface: { position: 'absolute' },
  element: { position: 'absolute', transformOrigin: 'top left' },
});

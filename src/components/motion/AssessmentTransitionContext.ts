import { createContext, useContext, type RefObject } from 'react';
import { Animated, type View } from 'react-native';

import type { HomeAssessmentId } from '@/features/home/components/HomeScreen.data';

export type MorphBox = { x: number; y: number; width: number; height: number };
export type TileGeometry = { card: MorphBox; icon: MorphBox; title: MorphBox };
export type HeaderGeometry = { icon: MorphBox; title: MorphBox; text: string; fontSize: number; lineHeight: number };
export type MeasureTile = (id: HomeAssessmentId, viewport?: MorphBox) => Promise<TileGeometry | null>;
export type MorphScene = {
  id: HomeAssessmentId;
  direction: 'open' | 'close';
  phase: 'measure' | 'expand' | 'waiting' | 'reveal' | 'collapse';
  viewport: MorphBox;
  tile: TileGeometry;
  header?: HeaderGeometry;
};

export function measureMorphBox(node: Pick<View, 'measureInWindow'> | null): Promise<MorphBox | null> {
  return new Promise(resolve => {
    if (!node) { resolve(null); return; }
    node.measureInWindow((x, y, width, height) => {
      resolve(width > 0 && height > 0 ? { x, y, width, height } : null);
    });
  });
}

type AssessmentTransitionValue = {
  busy: boolean;
  scene: MorphScene | null;
  progress: Animated.Value;
  reveal: Animated.Value;
  viewportRef: RefObject<View | null>;
  onViewportLayout: () => void;
  openTile: (id: HomeAssessmentId, measureTile: MeasureTile, navigate: () => void) => void;
  homeReady: (measureTile: MeasureTile) => void;
  targetReady: (header: HeaderGeometry) => void;
  reportHeader: (id: HomeAssessmentId, header: HeaderGeometry) => void;
};

export const AssessmentTransitionContext = createContext<AssessmentTransitionValue | null>(null);

export function useAssessmentTransition() {
  const context = useContext(AssessmentTransitionContext);
  if (!context) throw new Error('Assessment transitions require AssessmentTransitionProvider.');
  return context;
}

import { usePathname } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, BackHandler, Easing, View } from 'react-native';

import type { HomeAssessmentId } from '@/features/home/components/HomeScreen.data';
import { useReducedMotion } from './MotionProvider';
import {
  AssessmentTransitionContext, measureMorphBox,
  type HeaderGeometry, type MeasureTile, type MorphBox, type MorphScene,
} from './AssessmentTransitionContext';

export default function AssessmentTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const preference = useRef(reducedMotion);
  preference.current = reducedMotion;
  const [busy, setBusy] = useState(false);
  const [scene, setScene] = useState<MorphScene | null>(null);
  const current = useRef<MorphScene | null>(null);
  const locked = useRef(false);
  const viewportRef = useRef<View>(null);
  const viewport = useRef<MorphBox | null>(null);
  const origin = useRef<MorphScene | null>(null);
  const activeHeader = useRef<{ id: HomeAssessmentId; geometry: HeaderGeometry } | null>(null);
  const pendingNavigation = useRef<(() => void) | null>(null);
  const animation = useRef<Animated.CompositeAnimation | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const reveal = useRef(new Animated.Value(0)).current;
  const previousPath = useRef(pathname);

  const updateScene = useCallback((next: MorphScene | null) => {
    current.current = next;
    setScene(next);
  }, []);

  const finish = useCallback((navigate = false) => {
    animation.current?.stop();
    const action = pendingNavigation.current;
    pendingNavigation.current = null;
    updateScene(null);
    locked.current = false;
    setBusy(false);
    if (navigate) action?.();
  }, [updateScene]);

  const onViewportLayout = useCallback(async () => {
    const box = await measureMorphBox(viewportRef.current);
    if (!box) return;
    const previous = viewport.current;
    viewport.current = box;
    if (locked.current && previous && (previous.width !== box.width || previous.height !== box.height)) finish(true);
  }, [finish]);

  const openTile = useCallback(async (id: HomeAssessmentId, measureTile: MeasureTile, navigate: () => void) => {
    if (locked.current) return;
    if (preference.current !== false) { origin.current = null; navigate(); return; }
    locked.current = true;
    setBusy(true);
    pendingNavigation.current = navigate;
    const [tile, box] = await Promise.all([measureTile(id), measureMorphBox(viewportRef.current)]);
    if (!locked.current || pendingNavigation.current !== navigate) return;
    if (!tile || !box) { finish(true); return; }
    viewport.current = box;
    progress.setValue(0);
    reveal.setValue(0);
    updateScene({ id, tile, viewport: box, direction: 'open', phase: 'measure' });
  }, [finish, progress, reveal, updateScene]);

  const targetReady = useCallback((header: HeaderGeometry) => {
    const pending = current.current;
    if (!pending || pending.direction !== 'open' || pending.phase !== 'measure') return;
    const opening: MorphScene = { ...pending, header, phase: 'expand' };
    updateScene(opening);
    origin.current = opening;
    animation.current = Animated.timing(progress, {
      toValue: 1, duration: 420, easing: Easing.inOut(Easing.cubic), useNativeDriver: false,
    });
    animation.current.start(({ finished }) => {
      if (!finished) return;
      updateScene({ ...opening, phase: 'waiting' });
      const navigate = pendingNavigation.current;
      pendingNavigation.current = null;
      navigate?.();
    });
  }, [progress, updateScene]);

  const reportHeader = useCallback((id: HomeAssessmentId, geometry: HeaderGeometry) => {
    activeHeader.current = { id, geometry };
    const pending = current.current;
    if (!pending || pending.id !== id || pending.direction !== 'open' || pending.phase !== 'waiting') return;
    updateScene({ ...pending, phase: 'reveal' });
    animation.current = Animated.timing(reveal, {
      toValue: 1, duration: 140, easing: Easing.out(Easing.quad), useNativeDriver: false,
    });
    animation.current.start(({ finished }) => { if (finished) finish(); });
  }, [finish, reveal, updateScene]);

  const homeReady = useCallback(async (measureTile: MeasureTile) => {
    const pending = current.current;
    if (!pending || pending.direction !== 'close' || pending.phase !== 'waiting') return;
    const tile = await measureTile(pending.id, pending.viewport);
    if (current.current !== pending) return;
    if (!tile) { finish(); return; }
    updateScene({ ...pending, tile, phase: 'collapse' });
    animation.current = Animated.timing(progress, {
      toValue: 0, duration: 380, easing: Easing.inOut(Easing.cubic), useNativeDriver: false,
    });
    animation.current.start(({ finished }) => { if (finished) finish(); });
  }, [finish, progress, updateScene]);

  useLayoutEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    const source = origin.current;
    if (pathname === '/home' && source && previous.startsWith(`/assessment/${source.id}`)) {
      if (preference.current !== false) { finish(); return; }
      animation.current?.stop();
      pendingNavigation.current = null;
      progress.setValue(1);
      reveal.setValue(0);
      locked.current = true;
      setBusy(true);
      updateScene({
        ...source, direction: 'close', phase: 'waiting', viewport: viewport.current ?? source.viewport,
        header: activeHeader.current?.id === source.id ? activeHeader.current.geometry : source.header,
      });
    } else if (pathname !== '/home' && !pathname.startsWith(`/assessment/${source?.id ?? current.current?.id}`)) {
      origin.current = null;
      finish();
    }
  }, [finish, pathname, progress, reveal, updateScene]);

  useEffect(() => {
    if (reducedMotion !== false && locked.current) finish(true);
  }, [finish, reducedMotion]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => locked.current);
    return () => { subscription.remove(); animation.current?.stop(); };
  }, []);

  return (
    <AssessmentTransitionContext.Provider value={{
      busy, scene, progress, reveal, viewportRef, onViewportLayout,
      openTile, homeReady, targetReady, reportHeader,
    }}>
      {children}
    </AssessmentTransitionContext.Provider>
  );
}

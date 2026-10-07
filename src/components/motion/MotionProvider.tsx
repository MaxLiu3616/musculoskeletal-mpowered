import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AccessibilityInfo } from 'react-native';

const ReducedMotionContext = createContext<boolean | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(value => { if (active) setReducedMotion(value); })
      .catch(() => { if (active) setReducedMotion(true); });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', value => setReducedMotion(value));
    return () => { active = false; subscription?.remove(); };
  }, []);

  return <ReducedMotionContext.Provider value={reducedMotion}>{children}</ReducedMotionContext.Provider>;
}

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

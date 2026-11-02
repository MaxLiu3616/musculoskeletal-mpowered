import { Platform, ScrollView, type ScrollViewProps, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TABLET_BREAKPOINT } from './layout';

export default function AssessmentOptions({ style, ...props }: ScrollViewProps) {
  const { width, height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  // Tablets use the screen's scroll area; compact windows keep the list bounded.
  const maxHeight = width >= TABLET_BREAKPOINT ? undefined : Platform.OS === 'web'
    ? `max(132px, min(260px, calc(${height - 552}px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))))`
    : Math.max(132, Math.min(260, height - top - bottom - 552));
  return (
    <ScrollView {...props} nestedScrollEnabled showsVerticalScrollIndicator scrollEnabled={width < TABLET_BREAKPOINT}
      keyboardShouldPersistTaps="handled" style={[style, { flexGrow: 0, maxHeight }]} />
  );
}

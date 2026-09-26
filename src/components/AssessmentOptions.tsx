import { ScrollView, type ScrollViewProps, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AssessmentOptions({ style, ...props }: ScrollViewProps) {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  // Leave room for the heading, question, progress, and fixed navigation.
  const maxHeight = Math.max(132, Math.min(260, height - top - bottom - 552));
  return (
    <ScrollView {...props} nestedScrollEnabled showsVerticalScrollIndicator
      keyboardShouldPersistTaps="handled" style={[style, { flexGrow: 0, maxHeight }]} />
  );
}

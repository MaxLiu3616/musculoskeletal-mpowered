import { Children, type ReactNode } from 'react';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '@/components/ScreenHeader';
import useStaggeredEntrance from '@/components/motion/useStaggeredEntrance';
import { styles } from './MyHealthScreen.styles';

type HealthScreenProps = {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  footer?: ReactNode;
  animateEntrance?: boolean;
};

export default function HealthScreen({ title, children, onBack, footer, animateEntrance = false }: HealthScreenProps) {
  const { top } = useSafeAreaInsets();
  const entranceStyle = useStaggeredEntrance(animateEntrance);
  const header = <ScreenHeader title={title} onBack={onBack} />;
  return (
    <View style={[styles.viewport, Platform.OS === 'web' && styles.webViewport, { flex: 1 }]}>
      <KeyboardAvoidingView keyboardVerticalOffset={top} behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          {animateEntrance ? <Animated.View style={entranceStyle(0)}>{header}</Animated.View> : header}
          <View style={styles.content}>
            {animateEntrance ? Children.map(children, (child, index) => child && (
              <Animated.View style={entranceStyle(index + 1)}>{child}</Animated.View>
            )) : children}
          </View>
        </ScrollView>
        {footer}
      </KeyboardAvoidingView>
    </View>
  );
}

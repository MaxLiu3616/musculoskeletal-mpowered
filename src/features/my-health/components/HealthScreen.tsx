import { Children, useCallback, useRef, type ReactNode } from 'react';
import { useFocusEffect } from 'expo-router';
import { Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '@/components/ScreenHeader';
import { readableWidth } from '@/components/layout';
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
  const scrollRef = useRef<ScrollView>(null);
  const footerHeight = useRef(0);
  const focused = useRef(false);
  const revealInput = useCallback(() => {
    if (Platform.OS !== 'ios' || !focused.current || !Keyboard.isVisible()) return;
    const input = TextInput.State.currentlyFocusedInput();
    if (input) scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(input, top + footerHeight.current + 16, true);
  }, [top]);
  useFocusEffect(useCallback(() => {
    focused.current = true;
    const listener = Keyboard.addListener('keyboardDidShow', revealInput);
    return () => { focused.current = false; listener.remove(); };
  }, [revealInput]));
  const entranceStyle = useStaggeredEntrance(animateEntrance);
  const header = <ScreenHeader title={title} onBack={onBack} />;
  return (
    <View style={[styles.viewport, readableWidth, { flex: 1 }]}>
      <KeyboardAvoidingView keyboardVerticalOffset={top} behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView ref={scrollRef} onLayout={revealInput} onFocus={revealInput}
          showsVerticalScrollIndicator={false} style={styles.scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          {animateEntrance ? <Animated.View style={entranceStyle(0)}>{header}</Animated.View> : header}
          <View style={styles.content}>
            {animateEntrance ? Children.map(children, (child, index) => child && (
              <Animated.View style={entranceStyle(index + 1)}>{child}</Animated.View>
            )) : children}
          </View>
        </ScrollView>
        {footer ? <View onLayout={event => { footerHeight.current = event.nativeEvent.layout.height; }}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </View>
  );
}

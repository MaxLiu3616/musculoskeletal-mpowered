import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '@/components/ScreenHeader';
import { styles } from './MyHealthScreen.styles';

type HealthScreenProps = {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  footer?: ReactNode;
};

export default function HealthScreen({ title, children, onBack, footer }: HealthScreenProps) {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.viewport, Platform.OS === 'web' && styles.webViewport, { flex: 1 }]}>
      <KeyboardAvoidingView keyboardVerticalOffset={top} behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <ScreenHeader title={title} onBack={onBack} />
          <View style={styles.content}>{children}</View>
        </ScrollView>
        {footer}
      </KeyboardAvoidingView>
    </View>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BrandMark } from '@/components/ScreenHeader';
import { useAssessmentTransition } from '@/components/motion/AssessmentTransitionContext';
import { AppText as Text } from '@/components/typography';
import { colors } from '@/theme';
import { bottomNavigationItems, type BottomNavigationId } from './BottomNavigation.data';

export default function SideNavigation({ activeItem }: { activeItem: BottomNavigationId }) {
  const { busy } = useAssessmentTransition();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BrandMark />
      <View accessibilityRole="tablist" accessibilityLabel="Main navigation" style={styles.items}>
        {bottomNavigationItems.map(item => {
          const selected = item.id === activeItem;
          return (
            <Pressable key={item.id} accessibilityRole="tab" accessibilityLabel={item.label}
              accessibilityState={{ selected, disabled: busy }} aria-selected={selected} disabled={busy}
              onPress={() => { Keyboard.dismiss(); router.navigate(item.href); }}
              style={({ pressed }) => [styles.item, selected && styles.selected, pressed && styles.pressed]}>
              <Ionicons name={item.icon} size={24} color={selected ? colors.surface : colors.ink} />
              <Text style={[styles.label, selected && styles.selectedLabel]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width: 216, flex: 1, backgroundColor: colors.canvas, borderRightWidth: 1, borderRightColor: colors.softBorder },
  content: { paddingHorizontal: 16, paddingVertical: 28, gap: 40 },
  items: { gap: 10 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 56, padding: 12, borderRadius: 12 },
  selected: { backgroundColor: colors.primary },
  label: { flex: 1, color: colors.ink, fontSize: 14, lineHeight: 21, fontWeight: '600' },
  selectedLabel: { color: colors.surface },
  pressed: { opacity: 0.7 },
});

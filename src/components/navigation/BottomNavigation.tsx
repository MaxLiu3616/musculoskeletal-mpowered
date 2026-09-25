import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Keyboard, Pressable, View } from 'react-native';

import { AppText as Text } from '@/components/typography';
import { colors } from '@/theme';
import { bottomNavigationItems, type BottomNavigationId } from './BottomNavigation.data';
import { styles } from './BottomNavigation.styles';

export default function BottomNavigation({ activeItem }: { activeItem: BottomNavigationId }) {
  return (
    <View accessibilityRole="tablist" accessibilityLabel="Main navigation" style={styles.container}>
      {bottomNavigationItems.map((item) => {
        const isActive = item.id === activeItem;
        return (
          <Pressable accessibilityRole="tab" accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }} aria-selected={isActive}
            key={item.id} onPress={() => { Keyboard.dismiss(); router.navigate(item.href); }}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
            <View style={styles.iconContainer}>
              <Ionicons color={isActive ? colors.ink : colors.muted} name={item.icon} size={24} />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
            {isActive ? <View style={styles.activeIndicator} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Keyboard, Pressable, View } from 'react-native';

import { AppText as Text } from '@/components/typography';

import {
  bottomNavigationItems,
  type BottomNavigationId,
} from './BottomNavigation.data';

import { styles } from './BottomNavigation.styles';

type BottomNavigationProps = {
  activeItem: BottomNavigationId;
};

export default function BottomNavigation({
  activeItem,
}: BottomNavigationProps) {
  return (
    <View accessibilityRole="tablist" accessibilityLabel="Main navigation" style={styles.container}>
      {bottomNavigationItems.map((item) => {
        const isActive =
          item.id === activeItem;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{
              selected: isActive,
            }}
            aria-selected={isActive}
            key={item.id}
            onPress={() => {
              Keyboard.dismiss();
              router.navigate(item.href);
            }}
            style={({ pressed }) => [
              styles.item,
              pressed &&
                styles.itemPressed,
            ]}
          >
            {/* Active icon background */}
            <View
              style={[
                styles.iconContainer,
                isActive &&
                  styles.iconContainerActive,
              ]}
            >
              <Ionicons
                color={
                  isActive
                    ? '#4D3A67'
                    : '#514D57'
                }
                name={item.icon}
                size={24}
              />
            </View>

            {/* Navigation label */}
            <Text
              style={[
                styles.label,
                isActive &&
                  styles.labelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import {
  bottomNavigationItems,
  type BottomNavigationId,
} from './BottomNavigation.data';

import { styles } from './BottomNavigation.styles';

type BottomNavigationProps = {
  activeItem: BottomNavigationId;

  onItemPress?: (
    itemId: BottomNavigationId,
  ) => void;
};

export default function BottomNavigation({
  activeItem,
  onItemPress,
}: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      {bottomNavigationItems.map((item) => {
        const isActive =
          item.id === activeItem;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{
              selected: isActive,
            }}
            key={item.id}
            onPress={() =>
              onItemPress?.(item.id)
            }
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
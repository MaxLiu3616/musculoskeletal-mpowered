import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from './PainAssessmentScreen.styles';

type PainOption<T extends string> = {
  id: T;
  label: string;
};

type PainOptionListProps<T extends string> = {
  options: readonly PainOption<T>[];
  selectedIds: readonly T[];
  onToggle: (optionId: T) => void;
};

export default function PainOptionList<T extends string>({
  options,
  selectedIds,
  onToggle,
}: PainOptionListProps<T>) {
  return (
    <ScrollView
      contentContainerStyle={styles.options}
      nestedScrollEnabled
      showsVerticalScrollIndicator
      style={styles.optionsScroll}
    >
      {options.map((option) => {
        const isSelected = selectedIds.includes(option.id);

        return (
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isSelected }}
            key={option.id}
            onPress={() => onToggle(option.id)}
            style={({ pressed }) => [
              styles.option,
              pressed && styles.optionPressed,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>

            <View
              accessible={false}
              style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected,
              ]}
            >
              {isSelected ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

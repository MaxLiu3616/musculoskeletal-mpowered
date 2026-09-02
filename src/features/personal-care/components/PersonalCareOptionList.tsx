import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from './PersonalCareAssessmentScreen.styles';

type PersonalCareOptionListProps<T extends string> = {
    options: { id: T; label: string }[];
    selectedIds: T[];
    onToggle: (id: T) => void;
    multiSelect?: boolean;
};

export default function PersonalCareOptionList<T extends string>({
                                                                     options,
                                                                     selectedIds,
                                                                     onToggle,
                                                                     multiSelect = false,
                                                                 }: PersonalCareOptionListProps<T>) {
    return (
        <ScrollView
            contentContainerStyle={styles.options}
            style={styles.optionsScroll}
        >
            {options.map((option) => {
                const isSelected = selectedIds.includes(option.id);

                if (multiSelect) {
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
                                style={[
                                    styles.checkbox,
                                    isSelected && styles.checkboxSelected,
                                ]}
                            >
                                {isSelected ? (
                                    <Text style={styles.checkmark}>✓</Text>
                                ) : null}
                            </View>
                        </Pressable>
                    );
                }

                return (
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: isSelected }}
                        key={option.id}
                        onPress={() => onToggle(option.id)}
                        style={({ pressed }) => [
                            styles.option,
                            pressed && styles.optionPressed,
                        ]}
                    >
                        <View style={styles.selectorOuter}>
                            <View
                                style={[
                                    styles.radioOuter,
                                    isSelected && styles.radioOuterSelected,
                                ]}
                            >
                                {isSelected ? <View style={styles.radioDot} /> : null}
                            </View>
                        </View>

                        <Text
                            style={[
                                styles.optionText,
                                isSelected && styles.optionTextSelected,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}
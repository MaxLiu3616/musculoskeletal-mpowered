import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

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
    if (multiSelect) {
        return (
            <View style={styles.optionList}>
                {options.map((option, index) => {
                    const isSelected = selectedIds.includes(option.id);

                    return (
                        <Pressable
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: isSelected }}
                            key={option.id}
                            onPress={() => onToggle(option.id)}
                            style={({ pressed }) => [
                                styles.optionRow,
                                index === options.length - 1 && styles.optionRowLast,
                                isSelected && styles.optionRowSelected,
                                pressed && styles.optionRowPressed,
                            ]}
                        >
                            <Text style={styles.optionTextCheckbox}>{option.label}</Text>

                            <View
                                style={[
                                    styles.checkboxSquare,
                                    isSelected && styles.checkboxSquareSelected,
                                ]}
                            >
                                {isSelected ? (
                                    <Text style={styles.checkmark}>✓</Text>
                                ) : null}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        );
    }

    return (
        <View style={styles.optionList}>
            {options.map((option, index) => {
                const isSelected = selectedIds.includes(option.id);

                return (
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: isSelected }}
                        key={option.id}
                        onPress={() => onToggle(option.id)}
                        style={({ pressed }) => [
                            styles.optionRow,
                            index === options.length - 1 && styles.optionRowLast,
                            isSelected && styles.optionRowSelected,
                            pressed && styles.optionRowPressed,
                        ]}
                    >
                        <View
                            style={[styles.radio, isSelected && styles.radioSelected]}
                        >
                            {isSelected ? <View style={styles.radioDot} /> : null}
                        </View>

                        <Text style={styles.optionText}>{option.label}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
import { Pressable, ScrollView, View } from 'react-native';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';
import { useMemo, useState } from 'react';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { useSetting } from '@/features/setting/SettingContext';
import {conditionOptions, conditionSelectionScreenCopy, type ConditionOptionId,} from '@/features/onboarding/components/HealthConditionsScreen.data';

import { styles } from './SettingScreen.styles';

type AccountSettingsScreenProps = {
    onBack: () => void;
    onChangePhone: () => void;
    onSetPassword: () => void;
    onChangePassword: () => void;
};

export default function AccountSettingsScreen(
    props: AccountSettingsScreenProps,
) {
    const {
        onBack,
        onChangePhone,
        onSetPassword,
        onChangePassword,
    } = props;

    const {
        name,
        setName,
        profile,
        updateProfile,
    } = useOnboarding();

    const { phone, hasPassword } = useSetting();

    const [draftName, setDraftName] = useState(name);

    // Search text
    const [query, setQuery] = useState('');

    // Current selected conditions
    const [selectedConditions, setSelectedConditions] =
        useState<ConditionOptionId[]>(profile.conditions);

    // Filter conditions exactly like onboarding
    const visibleConditions = useMemo(() => {
        const normalisedQuery = query.trim().toLocaleLowerCase();

        if (!normalisedQuery) {
            return conditionOptions;
        }

        return conditionOptions.filter((condition) =>
            condition.label
                .toLocaleLowerCase()
                .includes(normalisedQuery),
        );
    }, [query]);

    // Update condition
    const toggleCondition = (conditionId: ConditionOptionId) => {
        setSelectedConditions((currentSelection) => {
            const updatedSelection = currentSelection.includes(conditionId)
                ? currentSelection.filter((id) => id !== conditionId)
                : [...currentSelection, conditionId];

            // Immediately save the new conditions
            updateProfile({
                conditions: updatedSelection,
            });

            return updatedSelection;
        });
    };

    return (
        <HealthScreen title="Account" onBack={onBack}>
            {/* Name */}
            <View style={styles.field}>
                <Text style={styles.label}>Name</Text>

                <TextInput
                    value={draftName}
                    onChangeText={(value) => {
                        setDraftName(value);
                        setName(value);
                    }}
                    placeholder="Your name"
                    style={styles.input}
                />
            </View>

            {/* Phone + Password */}
            <View style={styles.card}>
                <Pressable
                    accessibilityRole="button"
                    onPress={onChangePhone}
                    style={styles.row}
                >
                    <View>
                        <Text style={styles.rowText}>
                            Phone number
                        </Text>

                        <Text style={styles.muted}>
                            {phone || 'Not set'}
                        </Text>
                    </View>

                    <Text style={styles.value}>
                        Change
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={
                        hasPassword
                            ? onChangePassword
                            : onSetPassword
                    }
                    style={styles.row}
                >
                    <View>
                        <Text style={styles.rowText}>
                            Password
                        </Text>

                        <Text style={styles.muted}>
                            {hasPassword
                                ? '••••••••'
                                : 'Not set'}
                        </Text>
                    </View>

                    <Text style={styles.value}>
                        {hasPassword
                            ? 'Change'
                            : 'Set'}
                    </Text>
                </Pressable>
            </View>

            {/* Health Conditions */}
            <View style={styles.conditionsSection}>
                <Text style={styles.conditionsTitle}>
                    Health conditions
                </Text>

                <Text style={styles.conditionsHelper}>
                    Edit your current health conditions
                </Text>

                {/* Search conditions */}
                <View style={styles.searchContainer}>
                    <TextInput
                        accessibilityLabel={
                            conditionSelectionScreenCopy.searchPlaceholder
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setQuery}
                        placeholder={
                            conditionSelectionScreenCopy.searchPlaceholder
                        }
                        placeholderTextColor="#7A747D"
                        returnKeyType="search"
                        selectionColor="#6D50AC"
                        style={styles.searchInput}
                        value={query}
                    />

                    {query ? (
                        <Pressable
                            accessibilityLabel={
                                conditionSelectionScreenCopy.clearSearchLabel
                            }
                            accessibilityRole="button"
                            onPress={() => setQuery('')}
                            style={({ pressed }) => [
                                styles.clearSearchButton,
                                pressed &&
                                styles.clearSearchButtonPressed,
                            ]}
                        >
                            <Text style={styles.clearSearchText}>
                                ×
                            </Text>
                        </Pressable>
                    ) : null}
                </View>

                {/* Scrollable condition list */}
                <ScrollView
                    contentContainerStyle={
                        styles.conditionsListContent
                    }
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled
                    showsVerticalScrollIndicator
                    style={styles.conditionsList}
                >
                    {visibleConditions.length ? (
                        visibleConditions.map((condition) => {
                            const isSelected =
                                selectedConditions.includes(
                                    condition.id,
                                );

                            return (
                                <Pressable
                                    key={condition.id}
                                    accessibilityRole="checkbox"
                                    accessibilityState={{
                                        checked: isSelected,
                                    }}
                                    onPress={() =>
                                        toggleCondition(
                                            condition.id,
                                        )
                                    }
                                    style={({ pressed }) => [
                                        styles.conditionOption,
                                        isSelected &&
                                        styles.conditionOptionSelected,
                                        pressed &&
                                        styles.optionPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.conditionOptionText,
                                            isSelected &&
                                            styles.conditionOptionTextSelected,
                                        ]}
                                    >
                                        {condition.label}
                                    </Text>
                                </Pressable>
                            );
                        })
                    ) : (
                        <Text style={styles.noResults}>
                            {conditionSelectionScreenCopy.noResults}
                        </Text>
                    )}
                </ScrollView>
            </View>
        </HealthScreen>
    );
}
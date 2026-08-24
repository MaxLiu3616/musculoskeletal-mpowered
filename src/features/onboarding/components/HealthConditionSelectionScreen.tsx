import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import {
  conditionOptions,
  conditionSelectionScreenCopy,
  type ConditionOptionId,
} from './HealthConditionsScreen.data';
import { styles } from './HealthConditionsScreen.styles';

type HealthConditionSelectionScreenProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export default function HealthConditionSelectionScreen({
  onContinue,
  onSkip,
}: HealthConditionSelectionScreenProps) {
  const [query, setQuery] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<
    ConditionOptionId[]
  >([]);
  const canContinue = selectedConditions.length > 0;
  const visibleConditions = useMemo(() => {
    const normalisedQuery = query.trim().toLocaleLowerCase();

    if (!normalisedQuery) {
      return conditionOptions;
    }

    return conditionOptions.filter((condition) =>
      condition.label.toLocaleLowerCase().includes(normalisedQuery),
    );
  }, [query]);

  const toggleCondition = (conditionId: ConditionOptionId) => {
    setSelectedConditions((currentSelection) =>
      currentSelection.includes(conditionId)
        ? currentSelection.filter((id) => id !== conditionId)
        : [...currentSelection, conditionId],
    );
  };

  const continueToOtherConditions = () => {
    if (!canContinue) {
      return;
    }

    onContinue();
  };

  return (
    <View style={[styles.content, styles.selectionContent]}>
      <Text style={styles.title}>{conditionSelectionScreenCopy.title}</Text>
      <Text style={styles.selectionHelper}>
        {conditionSelectionScreenCopy.helper}
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          accessibilityLabel={conditionSelectionScreenCopy.searchPlaceholder}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setQuery}
          placeholder={conditionSelectionScreenCopy.searchPlaceholder}
          placeholderTextColor="#7A747D"
          returnKeyType="search"
          selectionColor="#6D50AC"
          style={styles.searchInput}
          value={query}
        />
        {query ? (
          <Pressable
            accessibilityLabel={conditionSelectionScreenCopy.clearSearchLabel}
            accessibilityRole="button"
            onPress={() => setQuery('')}
            style={({ pressed }) => [
              styles.clearSearchButton,
              pressed && styles.clearSearchButtonPressed,
            ]}
          >
            <Text style={styles.clearSearchText}>×</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={styles.conditionsListContent}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator
        style={styles.conditionsList}
      >
        {visibleConditions.length ? (
          visibleConditions.map((condition) => {
            const isSelected = selectedConditions.includes(condition.id);

            return (
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                key={condition.id}
                onPress={() => toggleCondition(condition.id)}
                style={({ pressed }) => [
                  styles.conditionOption,
                  isSelected && styles.conditionOptionSelected,
                  pressed && styles.optionPressed,
                ]}
              >
                <Text
                  style={[
                    styles.conditionOptionText,
                    isSelected && styles.conditionOptionTextSelected,
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

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={continueToOtherConditions}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.selectionButton,
          !canContinue && styles.primaryButtonDisabled,
          pressed && canContinue && styles.primaryButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.primaryButtonText,
            !canContinue && styles.primaryButtonTextDisabled,
          ]}
        >
          {conditionSelectionScreenCopy.continueLabel}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onSkip}
        style={({ pressed }) => [
          styles.skipButton,
          pressed && styles.skipButtonPressed,
        ]}
      >
        <Text style={styles.skipButtonText}>
          {conditionSelectionScreenCopy.skipLabel}
        </Text>
      </Pressable>
    </View>
  );
}

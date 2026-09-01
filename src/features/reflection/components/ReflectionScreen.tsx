import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import type { BottomNavigationId } from '@/components/navigation/BottomNavigation.data';
import { useReflection } from '@/features/reflection/ReflectionContext';

import {
  formatReflectionPeriod,
  reflectionScreenCopy,
} from './ReflectionScreen.data';
import { styles } from './ReflectionScreen.styles';

type ReflectionScreenProps = {
  onBack: () => void;
  onSave: () => void;
  onPainTrackerPress: () => void;
};

export default function ReflectionScreen({
  onBack,
  onSave,
  onPainTrackerPress,
}: ReflectionScreenProps) {
  const { savedNotes, saveNotes } = useReflection();
  const [notes, setNotes] = useState(savedNotes);
  const period = formatReflectionPeriod();

  const goBack = () => {
    Keyboard.dismiss();
    onBack();
  };

  const saveReflection = () => {
    saveNotes(notes.trim());
    Keyboard.dismiss();
    onSave();
  };

  const handleBottomNavigationPress = (
    itemId: BottomNavigationId,
  ) => {
    if (itemId === 'pain-tracker') {
      onPainTrackerPress();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
      <View
        style={[
          styles.viewport,
          Platform.OS === 'web' &&
            styles.webViewport,
        ]}
      >
        <KeyboardAvoidingView
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={
              styles.scrollContent
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.screen}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <Pressable
                  accessibilityLabel={
                    reflectionScreenCopy.backLabel
                  }
                  accessibilityRole="button"
                  onPress={goBack}
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed &&
                      styles.backButtonPressed,
                  ]}
                >
                  <Ionicons
                    color="#57418D"
                    name="arrow-back"
                    size={18}
                  />
                  <Text
                    style={styles.backButtonText}
                  >
                    {
                      reflectionScreenCopy.backLabel
                    }
                  </Text>
                </Pressable>

                <Text style={styles.headerTitle}>
                  {reflectionScreenCopy.headerTitle}
                </Text>
              </View>

              <Text style={styles.title}>
                {reflectionScreenCopy.title}
              </Text>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.notesLabel}>
                    {reflectionScreenCopy.notesLabel}
                  </Text>
                  <Text style={styles.period}>
                    {
                      reflectionScreenCopy.periodLabel
                    }
                    : {period}
                  </Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.prompt}>
                  {reflectionScreenCopy.prompt}
                </Text>

                <TextInput
                  accessibilityLabel={
                    reflectionScreenCopy.prompt
                  }
                  multiline
                  onChangeText={setNotes}
                  placeholder={
                    reflectionScreenCopy.placeholder
                  }
                  placeholderTextColor="#8A858E"
                  selectionColor="#6D50AC"
                  style={styles.input}
                  value={notes}
                />

                <View style={styles.actionRow}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={saveReflection}
                    style={({ pressed }) => [
                      styles.saveButton,
                      pressed &&
                        styles.saveButtonPressed,
                    ]}
                  >
                    <Text
                      style={styles.saveButtonText}
                    >
                      {
                        reflectionScreenCopy.saveLabel
                      }
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <BottomNavigation
          activeItem="pain-tracker"
          onItemPress={
            handleBottomNavigationPress
          }
        />
      </View>
    </SafeAreaView>
  );
}

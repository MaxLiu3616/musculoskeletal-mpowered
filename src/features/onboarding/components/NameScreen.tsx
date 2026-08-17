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
  View,
} from 'react-native';

import GreetingScreen from './GreetingScreen';
import NameEntryScreen from './NameEntryScreen';
import { nameScreenCopy } from './NameScreen.data';
import { styles } from './NameScreen.styles';
import SexScreen from './SexScreen';

type NameScreenProps = {
  onBack: () => void;
};

export default function NameScreen({ onBack }: NameScreenProps) {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [showSexScreen, setShowSexScreen] = useState(false);
  const trimmedName = name.trim();
  const canContinue = trimmedName.length > 0;

  const showGreetingScreen = () => {
    if (!canContinue) {
      return;
    }

    Keyboard.dismiss();
    setSubmittedName(trimmedName);
    setShowGreeting(true);
  };

  const goBack = () => {
    Keyboard.dismiss();

    if (showSexScreen) {
      setShowSexScreen(false);
      return;
    }

    if (showGreeting) {
      setShowGreeting(false);
      return;
    }

    onBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            hitSlop={4}
            onPress={goBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backButtonText}>
              {nameScreenCopy.backLabel}
            </Text>
          </Pressable>

          <View
            style={[
              styles.screen,
              showGreeting && styles.greetingScreen,
              showSexScreen && styles.sexScreen,
            ]}
          >
            {showSexScreen ? (
              <SexScreen />
            ) : showGreeting ? (
              <GreetingScreen
                name={submittedName}
                onContinue={() => setShowSexScreen(true)}
              />
            ) : (
              <NameEntryScreen
                canContinue={canContinue}
                name={name}
                onContinue={showGreetingScreen}
                onNameChange={setName}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

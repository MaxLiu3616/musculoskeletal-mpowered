import { useState } from 'react';
import { Keyboard } from 'react-native';

import NameEntryScreen from './NameEntryScreen';
import OnboardingScreen from './OnboardingScreen';

type NameScreenProps = {
  onBack: () => void;
  onContinue: (name: string) => void;
};

export default function NameScreen({
  onBack,
  onContinue,
}: NameScreenProps) {
  const [name, setName] = useState('');
  const trimmedName = name.trim();
  const canContinue = trimmedName.length > 0;

  const continueToGreeting = () => {
    if (!canContinue) {
      return;
    }

    Keyboard.dismiss();
    onContinue(trimmedName);
  };

  return (
    <OnboardingScreen onBack={onBack}>
      <NameEntryScreen
        canContinue={canContinue}
        name={name}
        onContinue={continueToGreeting}
        onNameChange={setName}
      />
    </OnboardingScreen>
  );
}

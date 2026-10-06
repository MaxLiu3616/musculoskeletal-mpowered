import { useState } from 'react';
import { Keyboard } from 'react-native';

import NameEntryScreen from './NameEntryScreen';
import OnboardingScreen from './OnboardingScreen';

import { useOnboarding } from '../OnboardingContext';

type NameScreenProps = {
  onBack: () => void;
  onContinue: (name: string) => void;
};

export default function NameScreen({
  onBack,
  onContinue,
}: NameScreenProps) {
  const { name: savedName } = useOnboarding();
  const [name, setName] = useState(savedName);
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

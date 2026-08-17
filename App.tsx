import { useState } from 'react';

import NameScreen from './src/features/onboarding/components/NameScreen';
import SplashScreen from './src/features/onboarding/components/SplashScreen';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'name'>('splash');

  if (screen === 'name') {
    return <NameScreen onBack={() => setScreen('splash')} />;
  }

  return <SplashScreen onGetStarted={() => setScreen('name')} />;
}

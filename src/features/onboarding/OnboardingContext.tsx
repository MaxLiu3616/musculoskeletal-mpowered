import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type OnboardingContextValue = {
  name: string;
  setName: (name: string) => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

type OnboardingProviderProps = {
  children: ReactNode;
};

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [name, setName] = useState('');

  return (
    <OnboardingContext.Provider value={{ name, setName }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }

  return context;
}

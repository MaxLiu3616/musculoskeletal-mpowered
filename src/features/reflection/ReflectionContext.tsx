import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type ReflectionContextValue = {
  savedNotes: string;
  saveNotes: (notes: string) => void;
};

const ReflectionContext = createContext<ReflectionContextValue | null>(null);

type ReflectionProviderProps = {
  children: ReactNode;
};

export function ReflectionProvider({
  children,
}: ReflectionProviderProps) {
  const [savedNotes, setSavedNotes] = useState('');

  return (
    <ReflectionContext.Provider
      value={{ savedNotes, saveNotes: setSavedNotes }}
    >
      {children}
    </ReflectionContext.Provider>
  );
}

export function useReflection() {
  const context = useContext(ReflectionContext);

  if (!context) {
    throw new Error(
      'useReflection must be used inside ReflectionProvider',
    );
  }

  return context;
}

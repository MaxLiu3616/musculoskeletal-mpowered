import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  loadReflectionNotes,
  saveReflectionNotes,
} from '@/services/reflectionNotes';

import { supabase } from '@/services/supabase';

type ReflectionContextValue = {
  savedNotes: string;

  saveNotes: (
    notes: string,
  ) => void;

  reset: () => void;
};

const ReflectionContext =
  createContext<ReflectionContextValue | null>(
    null,
  );

type ReflectionProviderProps = {
  children: ReactNode;
};

export function ReflectionProvider({
  children,
}: ReflectionProviderProps) {
  const [
    savedNotes,
    setSavedNotes,
  ] = useState('');

  const activeUserId =
    useRef<string | null>(
      null,
    );

  const restoreNotes =
    useCallback(
      async (
        userId: string,
      ) => {
        try {
          const notes =
            await loadReflectionNotes();

          if (
            activeUserId.current !==
            userId
          ) {
            return;
          }

          setSavedNotes(
            notes,
          );
        } catch (error) {
          console.error(
            'Failed to load reflection notes:',
            error,
          );
        }
      },
      [],
    );

  useEffect(() => {
    const { data } =
      supabase.auth.onAuthStateChange(
        (
          event,
          session,
        ) => {
          activeUserId.current =
            session?.user.id ??
            null;

          if (!session) {
            setSavedNotes('');
            return;
          }

          if (
            event ===
              'INITIAL_SESSION' ||
            event ===
              'SIGNED_IN'
          ) {
            const userId =
              session.user.id;

            setTimeout(
              () => {
                void restoreNotes(
                  userId,
                );
              },
              0,
            );
          }
        },
      );

    return () => {
      data.subscription.unsubscribe();
    };
  }, [
    restoreNotes,
  ]);

  const saveNotes =
    useCallback(
      (
        notes: string,
      ) => {
        setSavedNotes(
          notes,
        );

        void saveReflectionNotes(
          notes,
        ).catch(
          (error) => {
            console.error(
              'Failed to save reflection notes:',
              error,
            );
          },
        );
      },
      [],
    );

  const reset =
    useCallback(() => {
      setSavedNotes('');

      activeUserId.current =
        null;
    }, []);

  return (
    <ReflectionContext.Provider
      value={{
        savedNotes,
        saveNotes,
        reset,
      }}
    >
      {children}
    </ReflectionContext.Provider>
  );
}

export function useReflection() {
  const context =
    useContext(
      ReflectionContext,
    );

  if (!context) {
    throw new Error(
      'useReflection must be used inside ReflectionProvider',
    );
  }

  return context;
}
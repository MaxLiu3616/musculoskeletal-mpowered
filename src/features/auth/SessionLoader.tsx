import {
  router,
  usePathname,
} from 'expo-router';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { supabase } from '@/services/supabase';
import { getUserProfile } from '@/services/userProfile';
import { colors } from '@/theme';

type SessionLoaderProps = {
  children: ReactNode;
};

const protectedPrefixes = [
  '/home',
  '/assessment',
  '/reflection',
  '/my-health',
  '/care-planner',
  '/setting',
];

const isProtectedPath = (
  pathname: string,
) =>
  protectedPrefixes.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(
        `${prefix}/`,
      ),
  );

export default function SessionLoader({
  children,
}: SessionLoaderProps) {
  const pathname = usePathname();

  const initialPathname =
    useRef(pathname).current;

  const {
    setName,
    setAuthMode,
    updateProfile,
  } = useOnboarding();

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    let active = true;

    const loadSession =
      async () => {
        try {
          const {
            data: { session },
            error,
          } =
            await supabase.auth.getSession();

          if (error) {
            throw error;
          }

          if (!active) {
            return;
          }

          if (!session) {
            if (
              isProtectedPath(
                initialPathname,
              )
            ) {
              router.replace('/');
            }

            return;
          }

          const profile =
            await getUserProfile();

          if (!active) {
            return;
          }

          if (!profile) {
            const shouldSignOut =
              initialPathname === '/' ||
              isProtectedPath(
                initialPathname,
              );

            if (shouldSignOut) {
              await supabase.auth.signOut();

              if (
                active &&
                isProtectedPath(
                  initialPathname,
                )
              ) {
                router.replace('/');
              }
            }

            return;
          }

          setName(
            profile.name ?? '',
          );

          updateProfile({
            sex: profile.sex,
            yearOfBirth:
              profile.year_of_birth
                ?.toString() ?? '',
            diagnosis:
              profile.diagnosis,
            conditions:
              profile.conditions ?? [],
            otherConditions:
              profile.other_conditions ??
              '',
          });

          setAuthMode(null);

          if (
            initialPathname === '/'
          ) {
            router.replace('/home');
          }
        } catch (error) {
          console.error(
            'Failed to restore session:',
            error,
          );

          if (
            active &&
            isProtectedPath(
              initialPathname,
            )
          ) {
            router.replace('/');
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };

    void loadSession();

    return () => {
      active = false;
    };
  }, [
    initialPathname,
    setAuthMode,
    setName,
    updateProfile,
  ]);

  if (loading) {
    return (
      <View
        style={
          styles.loading
        }
      />
    );
  }

  return <>{children}</>;
}

const styles =
  StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor:
        colors.canvas,
    },
  });
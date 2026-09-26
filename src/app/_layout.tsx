import { Stack, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { getActiveBottomNavigationItem } from '@/components/navigation/BottomNavigation.data';

import { CarePlannerProvider } from '@/features/care-planner/CarePlannerContext';
import { HomeAssessmentProvider } from '@/features/home/HomeAssessmentContext';
import { MyHealthProvider } from '@/features/my-health/MyHealthContext';
import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';
import { ReflectionProvider } from '@/features/reflection/ReflectionContext';
import { SettingProvider } from '@/features/setting/SettingContext';
import { colors } from '@/theme';

function AppNavigator() {
  const pathname = usePathname();
  const activeItem = getActiveBottomNavigationItem(pathname);
  const isHome = pathname === '/home';

  return (
    <SafeAreaView
      edges={activeItem ? ['top', 'left', 'right'] : []}
      style={[
        styles.container,
        isHome && styles.homeContainer,
        Platform.OS === 'web' && styles.webViewport,
      ]}
    >
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {activeItem ? (
        <SafeAreaView edges={['bottom']} style={[styles.navigation, isHome && styles.homeNavigation]}>
          <BottomNavigation activeItem={activeItem} />
        </SafeAreaView>
      ) : null}
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    HomeSerif: require('../../assets/fonts/DMSerifDisplay-Regular.ttf'),
    HomeRegular: require('../../assets/fonts/Inter-Regular.ttf'),
    HomeSemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!fontsLoaded && !fontError) return <View style={styles.container} />;
  return (
    <MotionProvider>
      <OnboardingProvider>
        <HomeAssessmentProvider>
          <ReflectionProvider>
            <MyHealthProvider>
              <CarePlannerProvider>
                <SettingProvider>
                  <AppNavigator />
                </SettingProvider>
              </CarePlannerProvider>
            </MyHealthProvider>
          </ReflectionProvider>
        </HomeAssessmentProvider>
      </OnboardingProvider>
    </MotionProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center', backgroundColor: colors.peach },
  content: { flex: 1, minHeight: 0 },
  webViewport: { maxWidth: 390, maxHeight: 844 },
  navigation: { backgroundColor: colors.canvas, flexShrink: 0 },
  homeContainer: { backgroundColor: '#F8DAC6' },
  homeNavigation: { backgroundColor: '#FAF8F5' },
});

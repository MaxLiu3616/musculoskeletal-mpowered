import { Stack, usePathname } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import { getActiveBottomNavigationItem } from '@/components/navigation/BottomNavigation.data';

import { CarePlannerProvider } from '@/features/care-planner/CarePlannerContext';
import { HomeAssessmentProvider } from '@/features/home/HomeAssessmentContext';
import { MyHealthProvider } from '@/features/my-health/MyHealthContext';
import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';
import { ReflectionProvider } from '@/features/reflection/ReflectionContext';
import { SettingProvider } from '@/features/setting/SettingContext';

function AppNavigator() {
  const activeItem = getActiveBottomNavigationItem(usePathname());

  return (
    <SafeAreaView
      edges={activeItem ? ['top', 'left', 'right'] : []}
      style={[
        styles.container,
        activeItem && Platform.OS === 'web' && styles.webViewport,
      ]}
    >
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {activeItem ? (
        <SafeAreaView edges={['bottom']} style={styles.navigation}>
          <BottomNavigation activeItem={activeItem} />
        </SafeAreaView>
      ) : null}
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center', backgroundColor: '#FFFFFF' },
  content: { flex: 1, minHeight: 0 },
  webViewport: { maxWidth: 390, maxHeight: 844 },
  navigation: { backgroundColor: '#F5EDF8', flexShrink: 0 },
});

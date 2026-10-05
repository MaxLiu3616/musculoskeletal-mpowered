import { Stack, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import SideNavigation from '@/components/navigation/SideNavigation';
import { WIDE_LAYOUT_BREAKPOINT } from '@/components/layout';
import { MotionProvider } from '@/components/motion/MotionProvider';
import AssessmentTransitionProvider from '@/components/motion/AssessmentTransitionProvider';
import AssessmentTransitionLayer from '@/components/motion/AssessmentTransitionLayer';
import { useAssessmentTransition } from '@/components/motion/AssessmentTransitionContext';
import { homeAssessments } from '@/features/home/components/HomeScreen.data';
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
  const { width } = useWindowDimensions();
  const showSidebar = width >= WIDE_LAYOUT_BREAKPOINT && activeItem !== null;
  const { busy } = useAssessmentTransition();

  return (
    <SafeAreaView
      edges={activeItem ? (showSidebar ? ['top', 'bottom', 'left', 'right'] : ['top', 'left', 'right']) : []}
      style={[
        styles.container,
        isHome && styles.homeContainer,
        showSidebar && styles.wideContainer,
      ]}
    >
      {activeItem ? (
        <SafeAreaView edges={showSidebar ? [] : ['bottom']}
          style={[styles.navigation, isHome && styles.homeNavigation, showSidebar && styles.sideNavigation]}>
          {showSidebar ? <SideNavigation activeItem={activeItem} /> : <BottomNavigation activeItem={activeItem} />}
        </SafeAreaView>
      ) : null}
      <View style={styles.content}>
        <View style={[styles.content, { pointerEvents: busy ? 'none' : 'auto' }]}
          accessibilityElementsHidden={busy} importantForAccessibility={busy ? 'no-hide-descendants' : 'auto'} aria-hidden={busy}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }}>
            {homeAssessments.map(item => <Stack.Screen key={item.id} name={`assessment/${item.id}`} options={{ animation: 'none' }} />)}
          </Stack>
        </View>
        <AssessmentTransitionLayer />
      </View>
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
                  <AssessmentTransitionProvider>
                    <AppNavigator />
                  </AssessmentTransitionProvider>
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
  container: { flex: 1, flexDirection: 'column-reverse', width: '100%', backgroundColor: colors.canvas },
  content: { flex: 1, minHeight: 0, minWidth: 0 },
  wideContainer: { flexDirection: 'row' },
  sideNavigation: { width: 216 },
  navigation: { backgroundColor: colors.canvas, flexShrink: 0 },
  homeContainer: { backgroundColor: '#F8DAC6' },
  homeNavigation: { backgroundColor: '#FAF8F5' },
});

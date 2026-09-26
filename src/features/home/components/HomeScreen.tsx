import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { AppText as Text } from '@/components/typography';
import MotionPressable, { MotionArrow } from '@/components/motion/MotionPressable';
import InsightCard from '@/features/insights/components/InsightCard';
import type { PainInsight } from '@/features/insights/InsightCard.data';
import { useSetting } from '@/features/setting/SettingContext';

import HomeSummarySwipe from './HomeSummarySwipe';
import HomeAssessmentArrow from './HomeAssessmentArrow';
import useHomeMotion from './useHomeMotion';
import type { HomeSummaryItem, HomeSummaryType } from './HomeSummaryCard.data';
import {
  homeAssessments,
  homeScreenCopy,
  type HomeAssessmentId,
  type HomeAssessmentStatus,
} from './HomeScreen.data';
import { styles } from './HomeScreen.styles';

type HomeScreenProps = {
  userName: string;
  periodLabel?: string;
  assessmentStatus: Record<HomeAssessmentId, HomeAssessmentStatus>;
  painInsight?: PainInsight | null;
  summaryItems?: HomeSummaryItem[];
  onAssessmentPress?: (assessmentId: HomeAssessmentId) => void;
  onReflectionPress?: () => void;
  onDismissInsight?: () => void;
  onCheckPainHistory?: () => void;
  onPlanAppointment?: () => void;
  onCheckPainGuide?: () => void;
  onSummaryPress?: (type: HomeSummaryType) => void;
};

export default function HomeScreen({
  userName,
  periodLabel,
  assessmentStatus,
  painInsight = null,
  summaryItems = [],
  onAssessmentPress,
  onReflectionPress,
  onDismissInsight,
  onCheckPainHistory,
  onPlanAppointment,
  onCheckPainGuide,
  onSummaryPress,
}: HomeScreenProps) {
  const { width, fontScale } = useWindowDimensions();
  const { display } = useSetting();
  const { completion, entranceStyle } = useHomeMotion(assessmentStatus);
  const useTopArrows = width < 360 || display.textSize === 'large' || fontScale > 1.1;
  const [fontsLoaded] = useFonts({
    HomeSerif: require('../../../../assets/fonts/DMSerifDisplay-Regular.ttf'),
    HomeRegular: require('../../../../assets/fonts/Inter-Regular.ttf'),
    HomeSemiBold: require('../../../../assets/fonts/Inter-SemiBold.ttf'),
  });
  const regularFont = fontsLoaded ? { fontFamily: 'HomeRegular' } : undefined;
  const strongFont = fontsLoaded
    ? { fontFamily: 'HomeSemiBold' }
    : { fontWeight: '600' as const };
  const completedAssessments = homeAssessments.filter(
    (assessment) => assessmentStatus[assessment.id].completed,
  ).length;

  return (
    <View style={[styles.viewport, Platform.OS === 'web' && styles.webViewport]}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.screen}
      >
        <ImageBackground
          source={require('../../../../assets/images/home-anatomy-hero.png')}
          resizeMode="cover"
          style={styles.hero}
          imageStyle={styles.heroImage}
          accessible={false}
        >
          <Animated.View style={[styles.heroContent, entranceStyle(0)]}>
            <View style={styles.brandRow}>
              <Text style={[styles.brand, strongFont]}>{homeScreenCopy.brand}</Text>
              <Image
                source={require('../../../../assets/images/home-leaf-mark.png')}
                style={styles.leafMark}
                accessible={false}
              />
            </View>
            <Text style={[styles.greeting, regularFont]}>
              {homeScreenCopy.greetingPrefix}{userName ? `, ${userName}` : ''}
            </Text>
            <Text
              accessibilityRole="header"
              style={[
                styles.heading,
                fontsLoaded && { fontFamily: 'HomeSerif' },
                width < 360 && styles.compactHeading,
              ]}
            >
              {homeScreenCopy.heading}
            </Text>
          </Animated.View>
        </ImageBackground>

        <Animated.View style={[styles.progressPanel, entranceStyle(1)]}>
          <View style={styles.progressRow}>
            <View>
              <Text style={[styles.progressLabel, strongFont]}>
                {homeScreenCopy.progressLabel}
              </Text>
              {periodLabel ? <Text style={[styles.progressPeriod, regularFont]}>{periodLabel}</Text> : null}
            </View>
            <Text style={[styles.progressCount, regularFont]}>
              {completedAssessments} of {homeAssessments.length} complete
            </Text>
          </View>
          <View
            accessibilityRole="progressbar"
            accessibilityLabel="Weekly assessment progress"
            aria-valuemin={0}
            aria-valuemax={homeAssessments.length}
            aria-valuenow={completedAssessments}
            accessibilityValue={{
              min: 0,
              max: homeAssessments.length,
              now: completedAssessments,
            }}
            style={styles.progressSegments}
          >
            {homeAssessments.map((assessment, index) => (
              <View key={assessment.id} style={styles.progressSegment}>
                <Animated.View style={[styles.progressSegmentFill, { transform: [{ scaleX: completion[index] }] }]} />
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.content}>
          <HomeSummarySwipe items={summaryItems} onItemPress={onSummaryPress} />
          <InsightCard
            insight={painInsight}
            onDismiss={onDismissInsight}
            onCheckPainHistory={onCheckPainHistory}
            onPlanAppointment={onPlanAppointment}
            onCheckPainGuide={onCheckPainGuide}
          />

          <View style={styles.assessmentGrid}>
            {homeAssessments.map((assessment, index) => {
              const status = assessmentStatus[assessment.id];
              const isManagement = assessment.id === 'management';
              const iconSize = assessment.id === 'personal-care' || assessment.id === 'social-health' ? 30 : 36;
              const arrow = (
                <HomeAssessmentArrow completion={completion[index]}
                  style={!isManagement && (useTopArrows ? styles.topTileArrow : styles.tileArrow)} />
              );
              const copy = (
                <>
                  <View style={[styles.assessmentTitleRow, (isManagement || useTopArrows) && styles.fullTitleRow]}>
                    <Text style={[styles.assessmentTitle, strongFont, { color: assessment.color }]}>
                      {assessment.label}
                    </Text>
                    {!isManagement && !useTopArrows && arrow}
                  </View>
                  <Text style={[styles.assessmentDescription, regularFont, { color: assessment.color }]}>
                    {assessment.description}
                  </Text>
                  {status.updatedAt ? (
                    <Text style={[styles.updatedLabel, regularFont, { color: assessment.color }]}>
                      {homeScreenCopy.updatedLabel} {status.updatedAt}
                    </Text>
                  ) : null}
                </>
              );

              return (
                <Animated.View key={assessment.id} style={[
                  styles.assessmentLayout, isManagement && styles.managementLayout, entranceStyle(index + 2),
                ]}>
                  <MotionPressable
                    accessibilityRole="button"
                    accessibilityLabel={`${homeScreenCopy.recordLabel} ${assessment.label}`}
                    accessibilityHint={status.completed ? 'Completed this week. Opens your assessment to review or update.' : 'Opens the assessment.'}
                    onPress={() => onAssessmentPress?.(assessment.id)}
                    style={({ pressed }) => [
                      styles.assessmentCard,
                      { backgroundColor: assessment.backgroundColor },
                      isManagement && styles.managementCard,
                      pressed && styles.pressed,
                    ]}
                  >
                    {assessment.id === 'personal-care' ? (
                      <MaterialCommunityIcons
                        name={assessment.icon}
                        color={assessment.color}
                        size={iconSize}
                        style={[styles.assessmentIcon, { lineHeight: iconSize }]}
                      />
                    ) : (
                      <Ionicons
                        name={assessment.icon}
                        color={assessment.color}
                        size={iconSize}
                        style={[!isManagement && styles.assessmentIcon, { lineHeight: iconSize }]}
                      />
                    )}
                    {!isManagement && useTopArrows && arrow}
                    {isManagement ? <View style={styles.managementCopy}>{copy}</View> : copy}
                    {isManagement && arrow}
                  </MotionPressable>
                </Animated.View>
              );
            })}
          </View>

          <MotionPressable
            accessibilityRole="button"
            accessibilityLabel={homeScreenCopy.reflectionLabel}
            onPress={onReflectionPress}
            style={({ pressed }) => [styles.reflection, pressed && styles.pressed]}
          >
            <Ionicons name="pencil-outline" color="#082D6D" size={26} style={styles.reflectionIcon} />
            <Text style={[styles.reflectionLabel, strongFont]}>{homeScreenCopy.reflectionLabel}</Text>
            <MotionArrow><MaterialCommunityIcons name="arrow-right" color="#082D6D" size={23} /></MotionArrow>
          </MotionPressable>
          <Text style={[styles.supportedBy, regularFont]}>{homeScreenCopy.supportedByLabel}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

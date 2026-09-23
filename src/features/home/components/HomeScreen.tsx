import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { AppText as Text } from '@/components/typography';
import InsightCard from '@/features/insights/components/InsightCard';
import type { PainInsight } from '@/features/insights/InsightCard.data';
import { useSetting } from '@/features/setting/SettingContext';

import HomeSummarySwipe from './HomeSummarySwipe';
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
  periodLabel: string;
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
          <View style={styles.heroContent}>
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
          </View>
        </ImageBackground>

        <View style={styles.progressPanel}>
          <View style={styles.progressRow}>
            <View>
              <Text style={[styles.progressLabel, strongFont]}>
                {homeScreenCopy.progressLabel}
              </Text>
              <Text style={[styles.progressPeriod, regularFont]}>{periodLabel}</Text>
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
            {homeAssessments.map((assessment) => (
              <View
                key={assessment.id}
                style={[
                  styles.progressSegment,
                  assessmentStatus[assessment.id].completed && styles.progressSegmentComplete,
                ]}
              />
            ))}
          </View>
        </View>

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
            {homeAssessments.map((assessment) => {
              const status = assessmentStatus[assessment.id];
              const isManagement = assessment.id === 'management';
              const iconSize = assessment.id === 'personal-care' || assessment.id === 'social-health' ? 30 : 36;
              const arrow = (
                <View style={[
                  styles.assessmentArrow,
                  !isManagement && (useTopArrows ? styles.topTileArrow : styles.tileArrow),
                ]}>
                  <MaterialCommunityIcons
                    name={status.completed ? 'check' : 'arrow-right'}
                    color="#082D6D"
                    size={21}
                  />
                </View>
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
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${homeScreenCopy.recordLabel} ${assessment.label}`}
                  accessibilityHint={status.completed ? 'Completed this week. Opens your assessment to review or update.' : 'Opens the assessment.'}
                  key={assessment.id}
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
                </Pressable>
              );
            })}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={homeScreenCopy.reflectionLabel}
            onPress={onReflectionPress}
            style={({ pressed }) => [styles.reflection, pressed && styles.pressed]}
          >
            <Ionicons name="pencil-outline" color="#082D6D" size={26} style={styles.reflectionIcon} />
            <Text style={[styles.reflectionLabel, strongFont]}>{homeScreenCopy.reflectionLabel}</Text>
            <MaterialCommunityIcons name="arrow-right" color="#082D6D" size={23} />
          </Pressable>
          <Text style={[styles.supportedBy, regularFont]}>{homeScreenCopy.supportedByLabel}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { BrandMark } from '@/components/ScreenHeader';
import { colors } from '@/theme';
import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import { AppText as Text } from '@/components/typography';

import {
  loadingBridgeCopy,
  loadingBridgeSlideDuration,
  loadingBridgeSlides,
} from './LoadingBridgeScreen.data';
import { styles } from './LoadingBridgeScreen.styles';

type LoadingBridgeScreenProps = {
  onContinue: () => void;
};

export default function LoadingBridgeScreen({
  onContinue,
}: LoadingBridgeScreenProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = loadingBridgeSlides[activeSlide];
  const isFinalSlide = activeSlide === loadingBridgeSlides.length - 1;

  useEffect(() => {
    if (isFinalSlide) {
      return;
    }

    const timer = setTimeout(() => {
      setActiveSlide((currentSlide) => currentSlide + 1);
    }, loadingBridgeSlideDuration);

    return () => clearTimeout(timer);
  }, [activeSlide, isFinalSlide]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.peach} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}><BrandMark /></View>
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={styles.illustration}><Ionicons name={slide.icon} size={68} color={colors.primary} /></View>
            <Text accessibilityLiveRegion="polite" style={styles.message}>
              {slide.message}
            </Text>
          </View>

          {isFinalSlide ? (
            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={onContinue}
                style={({ pressed }) => [
                  styles.continueButton,
                  pressed && styles.continueButtonPressed,
                ]}
              >
                <Text style={styles.continueButtonText}>
                  {loadingBridgeCopy.continueLabel}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

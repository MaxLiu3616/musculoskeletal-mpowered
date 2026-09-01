import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image
              accessibilityIgnoresInvertColors
              accessibilityLabel={slide.imageLabel}
              resizeMode="contain"
              source={slide.image}
              style={styles.illustration}
            />
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

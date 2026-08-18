import { useEffect, useRef, useState } from 'react';
import {
  Image,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { splashSlides } from './SplashScreen.data';
import { styles } from './SplashScreen.styles';

type SplashScreenProps = {
  onGetStarted: () => void;
};

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [actionMessage, setActionMessage] = useState('');
  const [galleryWidth, setGalleryWidth] = useState(0);
  const galleryRef = useRef<ScrollView>(null);
  const slide = splashSlides[activeSlide];

  useEffect(() => {
    if (galleryWidth === 0) {
      return;
    }

    const timer = setTimeout(() => {
      const nextSlide = (activeSlide + 1) % splashSlides.length;

      setActiveSlide(nextSlide);
      galleryRef.current?.scrollTo({
        animated: true,
        x: nextSlide * galleryWidth,
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeSlide, galleryWidth]);

  useEffect(() => {
    if (galleryWidth === 0) {
      return;
    }

    galleryRef.current?.scrollTo({
      animated: false,
      x: activeSlide * galleryWidth,
    });
  }, [galleryWidth]);

  const showSlide = (index: number) => {
    setActiveSlide(index);
    galleryRef.current?.scrollTo({
      animated: true,
      x: index * galleryWidth,
    });
  };

  const updateSlideFromScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (galleryWidth === 0) {
      return;
    }

    const nextSlide = Math.round(
      event.nativeEvent.contentOffset.x / galleryWidth,
    );

    if (nextSlide >= 0 && nextSlide < splashSlides.length) {
      setActiveSlide(nextSlide);
    }
  };

  const measureGallery = (event: LayoutChangeEvent) => {
    setGalleryWidth(event.nativeEvent.layout.width);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            accessibilityLabel="MPowered Health"
            resizeMode="contain"
            source={require('../../../../assets/images/mpowered-health-logo.jpg')}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.hero}>
            <View onLayout={measureGallery} style={styles.gallery}>
              <ScrollView
                bounces={false}
                decelerationRate="fast"
                horizontal
                onMomentumScrollEnd={updateSlideFromScroll}
                pagingEnabled
                ref={galleryRef}
                showsHorizontalScrollIndicator={false}
                style={styles.galleryScroll}
              >
                {splashSlides.map(item => (
                  <Image
                    accessibilityIgnoresInvertColors
                    key={item.id}
                    resizeMode="contain"
                    source={item.image}
                    style={[
                      styles.preview,
                      galleryWidth > 0 && { width: galleryWidth },
                    ]}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.pagination}>
              {splashSlides.map((item, index) => {
                const isActive = index === activeSlide;

                return (
                  <Pressable
                    accessibilityLabel={`Show ${item.title}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    hitSlop={6}
                    key={item.id}
                    onPress={() => showSlide(index)}
                    style={styles.dotButton}
                  >
                    <View style={[styles.dot, isActive && styles.activeDot]} />
                  </Pressable>
                );
              })}
            </View>

            <Text accessibilityLiveRegion="polite" style={styles.title}>
              {slide.title}
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onGetStarted}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Get started →</Text>
            </Pressable>

            <Pressable
              accessibilityRole="link"
              onPress={() =>
                setActionMessage('The sign-in screen will connect here.')
              }
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>Sign in</Text>
            </Pressable>

            {actionMessage ? (
              <Text accessibilityLiveRegion="polite" style={styles.actionMessage}>
                {actionMessage}
              </Text>
            ) : null}

            <Text style={styles.supportText}>
              Supported by <Text style={styles.sponsor}>ABBVIE</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

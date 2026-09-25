import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, ImageBackground, Pressable, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

import { BrandMark } from '@/components/ScreenHeader';
import { AppText as Text } from '@/components/typography';
import { colors } from '@/theme';
import { splashSlides } from './SplashScreen.data';
import { styles } from './SplashScreen.styles';

export default function SplashScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [actionMessage, setActionMessage] = useState('');
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);
  const galleryRef = useRef<ScrollView>(null);

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (active) setReduceMotion(value); });
    const listener = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => { active = false; listener.remove(); };
  }, []);

  useEffect(() => {
    if (!galleryWidth || reduceMotion) return;
    const timer = setTimeout(() => {
      const next = (activeSlide + 1) % splashSlides.length;
      setActiveSlide(next);
      galleryRef.current?.scrollTo({ animated: true, x: next * galleryWidth });
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeSlide, galleryWidth, reduceMotion]);

  useEffect(() => {
    if (galleryWidth) galleryRef.current?.scrollTo({ animated: false, x: activeSlide * galleryWidth });
  }, [galleryWidth]);

  const showSlide = (index: number) => {
    setActiveSlide(index);
    galleryRef.current?.scrollTo({ animated: !reduceMotion, x: index * galleryWidth });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.peach} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../../../../assets/images/home-anatomy-hero.png')}
          resizeMode="cover" style={styles.hero} imageStyle={styles.heroImage}>
          <BrandMark />
          <Text accessibilityRole="header" style={styles.heroTitle}>Care for{ '\n' }all of you.</Text>
        </ImageBackground>

        <View style={styles.content}>
          <View onLayout={event => setGalleryWidth(event.nativeEvent.layout.width)} style={styles.gallery}>
            <ScrollView horizontal pagingEnabled bounces={false} ref={galleryRef}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={event => {
                if (!galleryWidth) return;
                const next = Math.round(event.nativeEvent.contentOffset.x / galleryWidth);
                if (next >= 0 && next < splashSlides.length) setActiveSlide(next);
              }}>
              {splashSlides.map((item, index) => {
                const dark = index === 0;
                return (
                  <View key={item.id} style={[styles.feature, index === 1 && styles.blueFeature,
                    index === 2 && styles.peachFeature, galleryWidth > 0 && { width: galleryWidth }]}>
                    <View style={styles.featureTop}>
                      <Ionicons name={item.icon} size={28} color={dark ? colors.surface : colors.ink} />
                      <Text style={[styles.featureNumber, !dark && styles.darkText]}>0{index + 1} / 03</Text>
                    </View>
                    <Text style={[styles.featureTitle, !dark && styles.darkText]}>{item.title}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.pagination}>
            {splashSlides.map((item, index) => (
              <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`Show ${item.title}`}
                accessibilityState={{ selected: index === activeSlide }} aria-pressed={index === activeSlide}
                onPress={() => showSlide(index)} style={styles.dotButton}>
                <View style={[styles.dot, index === activeSlide && styles.activeDot]} />
              </Pressable>
            ))}
          </View>

          <View style={styles.actions}>
            <Pressable accessibilityRole="button" accessibilityLabel="Get started" onPress={onGetStarted}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Text style={styles.primaryButtonText}>Get started</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.surface} />
            </Pressable>
            <Pressable accessibilityRole="link" onPress={() => setActionMessage('The sign-in screen will connect here.')}
              style={styles.signInButton}>
              <Text style={styles.signInText}>Sign in</Text>
            </Pressable>
            {actionMessage ? <Text accessibilityLiveRegion="polite" style={styles.actionMessage}>{actionMessage}</Text> : null}
          </View>
          <Text style={styles.sponsor}>Supported by ABBVIE</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

import { splashSlides } from './SplashScreen.data';
import { styles } from './SplashScreen.styles';

type SplashScreenProps = {
  onGetStarted: () => void;
};

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [actionMessage, setActionMessage] = useState('');
  const slide = splashSlides[activeSlide];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide(current => (current + 1) % splashSlides.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

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
            <Image
              accessibilityIgnoresInvertColors
              resizeMode="contain"
              source={slide.image}
              style={styles.preview}
            />

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
                    onPress={() => setActiveSlide(index)}
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

import * as React from 'react';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import type { BottomNavigationId } from '@/components/navigation/BottomNavigation.data';

import { personalCareAssessmentCopy } from '@/features/personal-care/definitions/PersonalCareAssessment.data';

import { styles } from './PersonalCareAssessmentScreen.styles';

type PersonalCareAssessmentScreenProps = {
    children: ReactNode;
    sectionTitle: string;
    step: number;
    canRecord: boolean;
    onBack: () => void;
    onRecord: () => void;
};

export default function PersonalCareAssessmentScreen({
                                                         children,
                                                         sectionTitle,
                                                         step,
                                                         canRecord,
                                                         onBack,
                                                         onRecord,
                                                     }: PersonalCareAssessmentScreenProps) {
    const goBack = () => {
        Keyboard.dismiss();
        onBack();
    };

    const handleBottomNavigationPress = (
        itemId: BottomNavigationId,
    ) => {
        if (itemId === 'pain-tracker') {
            router.replace('/home');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.screen}>
                        <View style={styles.header}>
                            <Pressable
                                accessibilityRole="button"
                                hitSlop={4}
                                onPress={goBack}
                                style={({ pressed }) => [
                                    styles.backButton,
                                    pressed && styles.backButtonPressed,
                                ]}
                            >
                                <Text style={styles.backButtonText}>
                                    {personalCareAssessmentCopy.backLabel}
                                </Text>
                            </Pressable>

                            <Text style={styles.trackerTitle}>
                                {personalCareAssessmentCopy.trackerTitle}
                            </Text>
                        </View>

                        <Text style={styles.assessmentTitle}>
                            {personalCareAssessmentCopy.assessmentTitle}
                        </Text>

                        <View style={styles.questionCard}>
                            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                            <View style={styles.divider} />

                            {children}

                            <View style={styles.actionRow}>
                                <View
                                    accessibilityLabel={`Question ${step} of 4`}
                                    style={styles.stepBadge}
                                >
                                    <Text style={styles.stepText}>{step}/4</Text>
                                </View>

                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityState={{ disabled: !canRecord }}
                                    disabled={!canRecord}
                                    onPress={onRecord}
                                    style={({ pressed }) => [
                                        styles.recordButton,
                                        !canRecord && styles.recordButtonDisabled,
                                        pressed && canRecord && styles.recordButtonPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.recordButtonText,
                                            !canRecord && styles.recordButtonTextDisabled,
                                        ]}
                                    >
                                        {personalCareAssessmentCopy.recordLabel}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <BottomNavigation
                activeItem="pain-tracker"
                onItemPress={handleBottomNavigationPress}
            />
        </SafeAreaView>
    );
}
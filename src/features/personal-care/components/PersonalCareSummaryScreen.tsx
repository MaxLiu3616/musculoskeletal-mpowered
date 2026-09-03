import * as React from 'react';
import { router } from 'expo-router';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import type { BottomNavigationId } from '@/components/navigation/BottomNavigation.data';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import {
    findGeneralActivityLabel,
    findPersonalCareLabel,
    findSleepLabel,
    getAssessmentPeriodLabel,
    getPersonalCareSummaryDescription,
    getPersonalCareTotalScore,
    personalCareAssessmentCopy,
} from '@/features/personal-care/definitions/PersonalCareAssessment.data';

import { styles } from './PersonalCareAssessmentScreen.styles';

type PersonalCareSummaryScreenProps = {
    onBack: () => void;
    onClose: () => void;
};

export default function PersonalCareSummaryScreen({
                                                      onBack,
                                                      onClose,
                                                  }: PersonalCareSummaryScreenProps) {
    const { responses } = usePersonalCareAssessment();

    const generalActivityLabels = responses.generalActivityImpacts.map(
        (id) => findGeneralActivityLabel(id) ?? id,
    );
    const personalCareLabel = responses.personalCare
        ? findPersonalCareLabel(responses.personalCare)
        : null;
    const sleepLabel = responses.sleep ? findSleepLabel(responses.sleep) : null;
    const totalScore = getPersonalCareTotalScore(
        responses.generalActivityImpacts,
        responses.personalCare,
        responses.sleep,
    );
    const description = getPersonalCareSummaryDescription(totalScore);

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

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.screen}>
                    <View style={styles.header}>
                        <Pressable
                            accessibilityRole="button"
                            hitSlop={4}
                            onPress={onBack}
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

                    <Text style={styles.assessmentTitle}>My Pain Summary</Text>

                    <View style={styles.questionCard}>
                        <View style={styles.header}>
                            <Text style={styles.sectionTitle}>
                                {personalCareAssessmentCopy.assessmentTitle}
                            </Text>
                            <Text style={styles.summaryPeriod}>
                                Period: {getAssessmentPeriodLabel()}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.summarySectionTitle}>Summary</Text>

                        <View style={styles.summaryHighlightBox}>
                            <Text style={styles.summaryHighlightText}>
                                {description.firstLine}{' '}
                                <Text style={styles.summaryHighlightBold}>
                                    {description.boldPhrase}
                                </Text>{' '}
                                {description.secondLine}
                            </Text>

                            <Pressable
                                accessibilityRole="button"
                                style={({ pressed }) => [
                                    styles.exploreTipsButton,
                                    pressed && { opacity: 0.78 },
                                ]}
                            >
                                <Text style={styles.exploreTipsText}>
                                    🔍 Explore tips on daily living
                                </Text>
                            </Pressable>
                        </View>

                        <Text style={[styles.summarySectionTitle, { marginTop: 22 }]}>
                            My results:
                        </Text>

                        <View style={{ marginLeft: 14, marginTop: 14 }}>
                            <Text style={styles.summaryItem}>General Activities:</Text>
                            <Text style={styles.summaryText}>
                                {generalActivityLabels.length > 0
                                    ? generalActivityLabels.join(', ')
                                    : 'No impacts selected.'}
                            </Text>
                        </View>

                        <View style={{ marginLeft: 14, marginTop: 14 }}>
                            <Text style={styles.summaryItem}>
                                Personal care (washing, dressing, etc):
                            </Text>
                            <Text style={styles.summaryText}>
                                {personalCareLabel ?? 'Not recorded.'}
                            </Text>
                        </View>

                        <View style={{ marginLeft: 14, marginTop: 14 }}>
                            <Text style={styles.summaryItem}>Sleeping:</Text>
                            <Text style={styles.summaryText}>
                                {sleepLabel ?? 'Not recorded.'}
                            </Text>
                        </View>

                        <View style={{ marginTop: 24 }}>
                            <Text style={styles.summarySectionTitle}>My reflections:</Text>
                            <Text
                                style={[styles.summaryText, { marginLeft: 14, marginTop: 8 }]}
                            >
                                {responses.reflection.trim() || 'No reflection recorded.'}
                            </Text>
                        </View>

                        <View style={styles.summaryFooter}>
                            <Text style={styles.sessionNote}>
                                {personalCareAssessmentCopy.summarySessionNote}
                            </Text>

                            <Pressable
                                accessibilityRole="button"
                                onPress={onClose}
                                style={({ pressed }) => [
                                    styles.recordButton,
                                    styles.summaryCloseButton,
                                    pressed && { backgroundColor: '#F3ECF7' },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.recordButtonText,
                                        styles.summaryCloseButtonText,
                                    ]}
                                >
                                    {personalCareAssessmentCopy.closeLabel}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <BottomNavigation
                activeItem="pain-tracker"
                onItemPress={handleBottomNavigationPress}
            />
        </SafeAreaView>
    );
}
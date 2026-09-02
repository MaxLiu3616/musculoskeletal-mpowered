import * as React from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';

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
                    <Text style={styles.prompt}>
                        {personalCareAssessmentCopy.summaryIntro}
                    </Text>

                    <View style={styles.questionCard}>
                        <View style={styles.header}>
                            <Text style={styles.sectionTitle}>
                                {personalCareAssessmentCopy.assessmentTitle}
                            </Text>
                            <Text style={styles.summaryPeriod}>
                                Period: {getAssessmentPeriodLabel()}
                            </Text>
                        </View>

                        <View style={styles.summarySection}>
                            <Text style={styles.summarySectionTitle}>Summary</Text>

                            <View style={styles.summaryHighlightBox}>
                                <Text style={styles.summaryHighlightText}>
                                    {getPersonalCareSummaryDescription(totalScore).firstLine}{' '}
                                    <Text style={styles.summaryHighlightBold}>
                                        {getPersonalCareSummaryDescription(totalScore).boldPhrase}
                                    </Text>{' '}
                                    {getPersonalCareSummaryDescription(totalScore).secondLine}
                                </Text>

                                <Pressable
                                    accessibilityRole="button"
                                    style={({ pressed }) => [
                                        styles.exploreTipsButton,
                                        pressed && styles.recordButtonPressed,
                                    ]}
                                >
                                    <Text style={styles.exploreTipsText}>
                                        🔍 Explore tips on daily living
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.summarySection}>
                            <Text style={styles.summarySectionTitle}>My results:</Text>

                            <View style={{ marginTop: 8 }}>
                                <Text style={styles.summaryItem}>General Activities:</Text>
                                <Text style={styles.summaryText}>
                                    {generalActivityLabels.length > 0
                                        ? generalActivityLabels.join(', ')
                                        : 'No impacts selected.'}
                                </Text>
                            </View>

                            <View style={{ marginTop: 12 }}>
                                <Text style={styles.summaryItem}>
                                    Personal care (washing, dressing, etc):
                                </Text>
                                <Text style={styles.summaryText}>
                                    {personalCareLabel ?? 'Not recorded'}
                                </Text>
                            </View>

                            <View style={{ marginTop: 12 }}>
                                <Text style={styles.summaryItem}>Sleeping:</Text>
                                <Text style={styles.summaryText}>
                                    {sleepLabel ?? 'Not recorded'}
                                </Text>
                            </View>
                        </View>

                        {responses.reflection ? (
                            <View style={styles.summarySection}>
                                <Text style={styles.summarySectionTitle}>
                                    My reflections:
                                </Text>
                                <Text style={styles.summaryText}>{responses.reflection}</Text>
                            </View>
                        ) : null}

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
                                    pressed && styles.recordButtonPressed,
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
        </SafeAreaView>
    );
}
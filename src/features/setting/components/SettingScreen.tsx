import { Pressable, View } from 'react-native';

import { AppText as Text } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';

import { styles } from './SettingScreen.styles';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

type SettingScreenProps = {
    onAccount: () => void;
    onNotifications: () => void;
    onSupportPeople: () => void;
    onDisplay: () => void;
    onLogout: () => void;
};

export default function SettingScreen(props: SettingScreenProps) {
    const { onAccount, onNotifications, onSupportPeople, onDisplay, onLogout } = props;
    const { name } = useOnboarding();

    return (

        <HealthScreen
            title="Setting"
        >

            <Text style={styles.subtitle}>
                {name}
            </Text>

            <View style={styles.assessmentCard}>
                <Pressable accessibilityRole="button" onPress={onAccount} style={styles.assessmentRow}>
                    <Text style={styles.assessmentRowText}>Account</Text>
                </Pressable>

                <Pressable accessibilityRole="button" onPress={onNotifications} style={styles.assessmentRow}>
                    <Text style={styles.assessmentRowText}>Notification</Text>
                </Pressable>

                <Pressable accessibilityRole="button" onPress={onSupportPeople} style={styles.assessmentRow}>
                    <Text style={styles.assessmentRowText}>Support People</Text>
                </Pressable>

                <Pressable accessibilityRole="button" onPress={onDisplay} style={styles.assessmentRow}>
                    <Text style={styles.assessmentRowText}>Display</Text>
                </Pressable>
            </View>

            <Text
                accessibilityRole="button"
                onPress={onLogout}
                style={styles.logoutText}
            >
                Log out
            </Text>
        </HealthScreen>
    );
}
import { Pressable, Text, View } from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import HealthScreen from '@/features/my-health/components/HealthScreen';

import { styles } from './SettingScreen.styles';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

type SettingScreenProps = {
    onAccount: () => void;
    onNotifications: () => void;
    onSupportPeople: () => void;
    onDisplay: () => void;
    onHome: () => void;
    onLogout: () => void;
};

export default function SettingScreen(props: SettingScreenProps) {
    const { onAccount, onNotifications, onSupportPeople, onDisplay, onHome, onLogout } = props;
    const { name } = useOnboarding();

    return (
        <HealthScreen
            title="Setting"
            footer={
                <BottomNavigation
                    activeItem="setting"
                    onItemPress={(id) => {
                        if (id === 'pain-tracker') {
                            onHome();
                        }
                    }}
                />
            }
        >
            <Text style={styles.subtitle}>
                {name ? `Hi, ${name}` : ''}
            </Text>

            <View style={styles.card}>
                <Pressable accessibilityRole="button" onPress={onAccount} style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Account</Text>
                </Pressable>

                <Pressable accessibilityRole="button" onPress={onNotifications} style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Notification</Text>
                </Pressable>

                <Pressable accessibilityRole="button" onPress={onSupportPeople} style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Support People</Text>
                </Pressable>

                <Pressable accessibilityRole="button" onPress={onDisplay} style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Display</Text>
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
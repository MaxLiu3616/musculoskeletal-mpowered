import { Pressable, Text, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type NotificationsSettingsScreenProps = {
    onBack: () => void;
};

export default function NotificationsSettingScreen(props: NotificationsSettingsScreenProps) {
    const { onBack } = props;
    const { notifications, updateNotifications } = useSetting();

    return (
        <HealthScreen title="Notification" onBack={onBack}>
            <View style={styles.card}>
                <Pressable
                    accessibilityRole="switch"
                    accessibilityState={{ checked: notifications.weeklyReminders }}
                    onPress={() =>
                        updateNotifications({
                            weeklyReminders: !notifications.weeklyReminders,
                        })
                    }
                    style={styles.row}
                >
                    <Text style={styles.rowText}>Weekly assessment reminders</Text>
                    <Text style={styles.value}>
                        {notifications.weeklyReminders ? 'On' : 'Off'}
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="switch"
                    accessibilityState={{ checked: notifications.appointmentReminders }}
                    onPress={() =>
                        updateNotifications({
                            appointmentReminders: !notifications.appointmentReminders,
                        })
                    }
                    style={styles.row}
                >
                    <Text style={styles.rowText}>Appointment reminders</Text>
                    <Text style={styles.value}>
                        {notifications.appointmentReminders ? 'On' : 'Off'}
                    </Text>
                </Pressable>
            </View>
        </HealthScreen>
    );
}
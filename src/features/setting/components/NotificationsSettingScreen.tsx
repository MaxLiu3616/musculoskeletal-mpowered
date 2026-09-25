import { Platform, Switch, View } from 'react-native';

import { AppText as Text } from '@/components/typography';
import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';
import { colors } from '@/theme';
import { styles } from './SettingScreen.styles';

export default function NotificationsSettingScreen({ onBack }: { onBack: () => void }) {
  const { notifications, updateNotifications } = useSetting();

  return (
    <HealthScreen title="Notifications" onBack={onBack}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowText}>Weekly assessment reminders</Text>
          <Switch accessibilityLabel="Weekly assessment reminders" hitSlop={8}
            {...(Platform.OS === 'web' ? { activeThumbColor: colors.surface, style: { height: 28, width: 50 } } : {})}
            value={notifications.weeklyReminders}
            onValueChange={(weeklyReminders) => updateNotifications({ weeklyReminders })}
            trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.surface} />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Appointment reminders</Text>
          <Switch accessibilityLabel="Appointment reminders" hitSlop={8}
            {...(Platform.OS === 'web' ? { activeThumbColor: colors.surface, style: { height: 28, width: 50 } } : {})}
            value={notifications.appointmentReminders}
            onValueChange={(appointmentReminders) => updateNotifications({ appointmentReminders })}
            trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.surface} />
        </View>
      </View>
    </HealthScreen>
  );
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { AppText as Text } from '@/components/typography';
import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { colors } from '@/theme';
import { styles } from './SettingScreen.styles';

type SettingScreenProps = {
  onAccount: () => void;
  onNotifications: () => void;
  onSupportPeople: () => void;
  onDisplay: () => void;
  onLogout: () => void;
};

export default function SettingScreen({
  onAccount, onNotifications, onSupportPeople, onDisplay, onLogout,
}: SettingScreenProps) {
  const { name } = useOnboarding();
  const items = [
    { label: 'Account', icon: 'person-outline', onPress: onAccount },
    { label: 'Notifications', icon: 'notifications-outline', onPress: onNotifications },
    { label: 'Support people', icon: 'people-outline', onPress: onSupportPeople },
    { label: 'Display', icon: 'text-outline', onPress: onDisplay },
  ] as const;

  return (
    <HealthScreen title="Settings">
      <View style={styles.accountHero}>
        <Ionicons name="person-circle-outline" size={46} color={colors.surface} />
        <View style={styles.accountCopy}>
          <Text style={styles.accountName}>{name || 'Your space'}</Text>
          <Text style={styles.accountDescription}>Make MPowered work for you.</Text>
        </View>
      </View>
      <View style={styles.settingsMenu}>
        {items.map((item, index) => (
          <Pressable key={item.label} accessibilityRole="button" accessibilityLabel={item.label}
            onPress={item.onPress}
            style={({ pressed }) => [styles.settingsItem, index > 0 && styles.settingsDivider, pressed && styles.pressed]}>
            <View style={[styles.settingsIcon, index % 2 === 1 && styles.peachIcon]}>
              <Ionicons name={item.icon} size={24} color={colors.ink} />
            </View>
            <Text style={styles.settingsLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={21} color={colors.muted} />
          </Pressable>
        ))}
      </View>
      <Pressable accessibilityRole="button" onPress={onLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
        <Ionicons name="log-out-outline" size={21} color={colors.danger} />
        <Text style={styles.logoutLabel}>Log out</Text>
      </Pressable>
    </HealthScreen>
  );
}

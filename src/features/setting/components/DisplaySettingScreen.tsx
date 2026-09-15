import { Pressable, View } from 'react-native';

import { AppText as Text } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';
import type { DisplayPreferences } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type DisplaySettingsScreenProps = {
    onBack: () => void;
};

const textSizeOptions: { id: DisplayPreferences['textSize']; label: string }[] = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
];

export default function DisplaySettingScreen(props: DisplaySettingsScreenProps) {
    const { onBack } = props;
    const { display, updateDisplay } = useSetting();

    return (
        <HealthScreen title="Display" onBack={onBack}>
            <Text style={styles.label}>Text size</Text>
            <Text style={styles.subtitle}>
                Choose a comfortable size. Changes apply throughout the app and are saved automatically.
            </Text>

            <View style={styles.card}>
                {textSizeOptions.map((option) => (
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityLabel={option.label}
                        accessibilityState={{ checked: display.textSize === option.id }}
                        aria-checked={display.textSize === option.id}
                        key={option.id}
                        onPress={() => updateDisplay({ textSize: option.id })}
                        style={styles.row}
                    >
                        <Text style={styles.rowText}>{option.label}</Text>
                        {display.textSize === option.id ? (
                            <Text style={styles.value}>✓</Text>
                        ) : null}
                    </Pressable>
                ))}
            </View>

            <Text style={styles.label}>Preview</Text>
            <View style={styles.card}>
                <Text accessibilityRole="header" style={styles.previewTitle}>
                    Your health, at a glance
                </Text>
                <Text style={styles.value}>
                    Track how you feel, review your progress, and prepare for your next appointment.
                </Text>
            </View>
        </HealthScreen>
    );
}

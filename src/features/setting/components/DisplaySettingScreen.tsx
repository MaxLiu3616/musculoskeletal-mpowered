import { Pressable, Text, View } from 'react-native';

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

            <View style={styles.card}>
                {textSizeOptions.map((option) => (
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: display.textSize === option.id }}
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
        </HealthScreen>
    );
}
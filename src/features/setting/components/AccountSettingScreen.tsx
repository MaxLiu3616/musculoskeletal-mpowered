import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type AccountSettingsScreenProps = {
    onBack: () => void;
    onChangePhone: () => void;
    onSetPassword: () => void;
    onChangePassword: () => void;
};

export default function AccountSettingsScreen(props: AccountSettingsScreenProps) {
    const { onBack, onChangePhone, onSetPassword, onChangePassword } = props;

    const { name, setName } = useOnboarding();
    const { phone, hasPassword } = useSetting();

    const [draftName, setDraftName] = useState(name);

    return (
        <HealthScreen title="Account" onBack={onBack}>
            <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={draftName}
                    onChangeText={(value) => {
                        setDraftName(value);
                        setName(value);
                    }}
                    placeholder="Your name"
                    style={styles.input}
                />
            </View>

            <View style={styles.card}>
                <Pressable
                    accessibilityRole="button"
                    onPress={onChangePhone}
                    style={styles.row}
                >
                    <View>
                        <Text style={styles.rowText}>Phone number</Text>
                        <Text style={styles.muted}>
                            {phone || 'Not set'}
                        </Text>
                    </View>
                    <Text style={styles.value}>Change</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={hasPassword ? onChangePassword : onSetPassword}
                    style={styles.row}
                >
                    <View>
                        <Text style={styles.rowText}>Password</Text>
                        <Text style={styles.muted}>
                            {hasPassword ? '••••••••' : 'Not set'}
                        </Text>
                    </View>
                    <Text style={styles.value}>
                        {hasPassword ? 'Change' : 'Set'}
                    </Text>
                </Pressable>
            </View>
        </HealthScreen>
    );
}
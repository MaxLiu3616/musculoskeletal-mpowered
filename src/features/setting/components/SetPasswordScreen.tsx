import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type SetPasswordScreenProps = {
    onBack: () => void;
    onDone: () => void;
};

export default function SetPasswordScreen(props: SetPasswordScreenProps) {
    const { onBack, onDone } = props;
    const { setPassword } = useSetting();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const canSave =
        newPassword.length >= 6 && newPassword === confirmPassword;

    const save = () => {
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setPassword(newPassword);
        setError('');
        onDone();
    };

    return (
        <HealthScreen title="Set Password" onBack={onBack}>
            <Text style={styles.subtitle}>
                Set a password so you can also sign in without a verification code.
            </Text>

            <View style={styles.field}>
                <Text style={styles.label}>New password</Text>
                <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="At least 6 characters"
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Re-enter password"
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text
                accessibilityRole="button"
                onPress={save}
                style={[
                    styles.cardButtonText,
                    styles.card,
                    { textAlign: 'center', paddingVertical: 12 },
                    !canSave && styles.disabled,
                ]}
            >
                Save password
            </Text>
        </HealthScreen>
    );
}
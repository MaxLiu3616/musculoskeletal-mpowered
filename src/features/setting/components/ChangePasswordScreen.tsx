import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type VerifyMethod = 'password' | 'code';

type ChangePasswordScreenProps = {
    onBack: () => void;
    onDone: () => void;
};

export default function ChangePasswordScreen(props: ChangePasswordScreenProps) {
    const { onBack, onDone } = props;
    const { password, setPassword, phone } = useSetting();

    const [method, setMethod] = useState<VerifyMethod>('password');
    const [oldPassword, setOldPassword] = useState('');
    const [code, setCode] = useState('');
    const [verified, setVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const verify = () => {
        if (method === 'password') {
            if (oldPassword !== password) {
                setError('Incorrect password.');
                return;
            }
        } else {
            if (code.replace(/\D/g, '').length !== 4) {
                setError('Enter the 4-digit code.');
                return;
            }
            // Demo only: any 4-digit code is accepted.
        }

        setError('');
        setVerified(true);
    };

    const canSave =
        newPassword.length >= 6 && newPassword === confirmPassword;

    const save = () => {
        if (!canSave) {
            setError('Passwords must match and be at least 6 characters.');
            return;
        }

        setPassword(newPassword);
        setError('');
        onDone();
    };

    if (!verified) {
        return (
            <HealthScreen title="Change Password" onBack={onBack}>
                <Text style={styles.subtitle}>
                    Verify your identity to change your password.
                </Text>

                <View style={styles.card}>
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: method === 'password' }}
                        onPress={() => setMethod('password')}
                        style={styles.row}
                    >
                        <Text style={styles.rowText}>Use current password</Text>
                        {method === 'password' ? <Text style={styles.value}>✓</Text> : null}
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: method === 'code' }}
                        onPress={() => setMethod('code')}
                        style={styles.row}
                    >
                        <Text style={styles.rowText}>Use verification code</Text>
                        {method === 'code' ? <Text style={styles.value}>✓</Text> : null}
                    </Pressable>
                </View>

                {method === 'password' ? (
                    <View style={styles.field}>
                        <Text style={styles.label}>Current password</Text>
                        <TextInput
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            placeholder="Enter current password"
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                ) : (
                    <View style={styles.field}>
                        <Text style={styles.label}>
                            Verification code sent to {phone || 'your phone'}
                        </Text>
                        <TextInput
                            value={code}
                            onChangeText={setCode}
                            placeholder="4-digit code"
                            keyboardType="number-pad"
                            maxLength={4}
                            style={styles.input}
                        />
                    </View>
                )}

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Text
                    accessibilityRole="button"
                    onPress={verify}
                    style={[
                        styles.cardButtonText,
                        styles.card,
                        { textAlign: 'center', paddingVertical: 12 },
                    ]}
                >
                    Verify
                </Text>
            </HealthScreen>
        );
    }

    return (
        <HealthScreen title="Change Password" onBack={onBack}>
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
                <Text style={styles.label}>Confirm new password</Text>
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
                Save new password
            </Text>
        </HealthScreen>
    );
}
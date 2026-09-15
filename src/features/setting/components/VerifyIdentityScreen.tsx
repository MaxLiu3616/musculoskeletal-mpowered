import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type VerifyMethod = 'password' | 'code';

type VerifyIdentityScreenProps = {
    onBack: () => void;
    onVerified: () => void;
};

export default function VerifyIdentityScreen(props: VerifyIdentityScreenProps) {
    const { onBack, onVerified } = props;
    const { phone, password, hasPassword } = useSetting();

    const [method, setMethod] = useState<VerifyMethod>(
        hasPassword ? 'password' : 'code',
    );
    const [oldPassword, setOldPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const updateCode = (value: string) => {
        setCode(value.replace(/\D/g, '').slice(0, 4));
    };

    const verify = () => {
        if (method === 'password') {
            if (oldPassword !== password) {
                setError('Incorrect password.');
                return;
            }
        } else {
            if (code.length !== 4) {
                setError('Enter the 4-digit code.');
                return;
            }
            // Demo only: any 4-digit code is accepted.
        }

        Keyboard.dismiss();
        setError('');
        onVerified();
    };

    return (
        <HealthScreen title="Verify Your Identity" onBack={onBack}>
            <Text style={styles.subtitle}>
                Verify your identity before changing your phone number.
            </Text>

            {hasPassword ? (
                <View style={styles.card}>
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: method === 'password' }}
                        onPress={() => setMethod('password')}
                        style={styles.row}
                    >
                        <Text style={styles.rowText}>Use my password</Text>
                        {method === 'password' ? (
                            <Text style={styles.value}>✓</Text>
                        ) : null}
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: method === 'code' }}
                        onPress={() => setMethod('code')}
                        style={styles.row}
                    >
                        <Text style={styles.rowText}>
                            Use code sent to my current number
                        </Text>
                        {method === 'code' ? <Text style={styles.value}>✓</Text> : null}
                    </Pressable>
                </View>
            ) : null}

            {method === 'password' ? (
                <View style={styles.field}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        placeholder="Enter your password"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
            ) : (
                <View>
                    <Text style={[styles.label, { marginTop: 16, textAlign: 'center' }]}>
                        Verification code sent to {phone || 'your current number'}
                    </Text>

                    <View style={styles.codeInputArea}>
                        <View style={styles.codeBoxes}>
                            {[0, 1, 2, 3].map((index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.codeBox,
                                        index === Math.min(code.length, 3) &&
                                        styles.codeBoxActive,
                                    ]}
                                >
                                    <Text style={styles.codeDigit}>{code[index] ?? ''}</Text>
                                </View>
                            ))}
                        </View>

                        <TextInput
                            accessibilityLabel="Verification code"
                            autoComplete="one-time-code"
                            caretHidden
                            importantForAutofill="yes"
                            inputMode="numeric"
                            keyboardType="number-pad"
                            maxLength={4}
                            onChangeText={updateCode}
                            onSubmitEditing={verify}
                            returnKeyType="done"
                            selectionColor="transparent"
                            style={styles.codeInput}
                            textContentType="oneTimeCode"
                            value={code}
                        />
                    </View>
                </View>
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text
                accessibilityRole="button"
                onPress={verify}
                style={[
                    styles.cardButtonText,
                    styles.card,
                    { textAlign: 'center', paddingVertical: 12, marginTop: 16 },
                ]}
            >
                Verify
            </Text>
        </HealthScreen>
    );
}
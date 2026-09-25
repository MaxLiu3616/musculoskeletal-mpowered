import { useState } from 'react';
import { Keyboard, View } from 'react-native';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type VerifyNewPhoneScreenProps = {
    newPhone: string;
    onBack: () => void;
    onVerified: () => void;
};

export default function VerifyNewPhoneScreen(props: VerifyNewPhoneScreenProps) {
    const { newPhone, onBack, onVerified } = props;
    const { setPhone } = useSetting();

    const [code, setCode] = useState('');
    const canVerify = code.length === 4;

    const updateCode = (value: string) => {
        setCode(value.replace(/\D/g, '').slice(0, 4));
    };

    const verify = () => {
        if (!canVerify) {
            return;
        }

        Keyboard.dismiss();
        // Demo only: any 4-digit code is accepted.
        setPhone(newPhone);
        onVerified();
    };

    return (
        <HealthScreen title="Verify number" onBack={onBack}>
            <Text style={styles.subtitle}>
                We sent a 4-digit code to your new number {newPhone}. Enter it below
                to confirm.
            </Text>

            <View style={styles.codeInputArea}>
                <View style={styles.codeBoxes}>
                    {[0, 1, 2, 3].map((index) => (
                        <View
                            key={index}
                            style={[
                                styles.codeBox,
                                index === Math.min(code.length, 3) && styles.codeBoxActive,
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

            <Text
                accessibilityRole="button"
                accessibilityState={{ disabled: !canVerify }}
                onPress={verify}
                style={[
                    styles.cardButtonText,
                    styles.actionButton,
                    { textAlign: 'center', paddingVertical: 12, marginTop: 24 },
                    !canVerify && styles.disabled,
                ]}
            >
                Verify and update phone number
            </Text>
        </HealthScreen>
    );
}

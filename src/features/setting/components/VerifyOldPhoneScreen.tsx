import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type VerifyOldPhoneScreenProps = {
    newPhone: string;
    onBack: () => void;
    onVerified: () => void;
};

export default function VerifyOldPhoneScreen(props: VerifyOldPhoneScreenProps) {
    const { newPhone, onBack, onVerified } = props;
    const { phone, setPhone } = useSetting();

    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const canVerify = code.replace(/\D/g, '').length === 4;

    const verify = () => {
        if (!canVerify) {
            return;
        }

        // Demo only: any 4-digit code is accepted.
        setPhone(newPhone);
        setError('');
        onVerified();
    };

    return (
        <HealthScreen title="Verify Phone Number" onBack={onBack}>
            <Text style={styles.subtitle}>
                We sent a 4-digit code to your current number{' '}
                {phone || 'on file'}. Enter it below to confirm the change.
            </Text>

            <View style={styles.field}>
                <Text style={styles.label}>Verification code</Text>
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="4-digit code"
                    keyboardType="number-pad"
                    maxLength={4}
                    style={styles.input}
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text
                accessibilityRole="button"
                onPress={verify}
                style={[
                    styles.cardButtonText,
                    styles.card,
                    { textAlign: 'center', paddingVertical: 12 },
                    !canVerify && styles.disabled,
                ]}
            >
                Verify and continue
            </Text>
        </HealthScreen>
    );
}
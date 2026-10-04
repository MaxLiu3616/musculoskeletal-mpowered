import { colors } from '@/theme';
import { useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';
import { useOnboarding } from '../OnboardingContext';
import { supabase } from '@/services/supabase';

import { phoneNumberScreenCopy } from './LoginInformationScreen.data';
import { styles } from './LoginInformationScreen.styles';

type PhoneNumberScreenProps = {
    onContinue: () => void;
};

const toE164 = (rawNumber: string) => {
    const digits = rawNumber.replace(/\D/g, '');
    const withoutLeadingZero = digits.startsWith('0') ? digits.slice(1) : digits;
    return `+61${withoutLeadingZero}`;
};

export default function PhoneNumberScreen({
                                              onContinue,
                                          }: PhoneNumberScreenProps) {
    const { setPhoneNumber } = useOnboarding();
    const [phoneNumber, setLocalPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const canContinue = phoneNumber.replace(/\D/g, '').length > 0 && !loading;

    const continueToVerification = async () => {
        if (!canContinue) {
            return;
        }

        Keyboard.dismiss();
        setError(null);
        setLoading(true);

        const e164Number = toE164(phoneNumber);
        const { error: sendError } = await supabase.auth.signInWithOtp({
            phone: e164Number,
        });

        setLoading(false);

        if (sendError) {
            setError(sendError.message);
            return;
        }

        setPhoneNumber(e164Number);
        onContinue();
    };

    return (
        <View style={[styles.content, styles.phoneContent]}>
            <Text style={styles.title}>{phoneNumberScreenCopy.title}</Text>

            <TextInput
                accessibilityLabel={phoneNumberScreenCopy.inputLabel}
                autoComplete="tel"
                inputMode="tel"
                keyboardType="phone-pad"
                onChangeText={setLocalPhoneNumber}
                onSubmitEditing={continueToVerification}
                returnKeyType="done"
                selectionColor={colors.primary}
                style={styles.phoneInput}
                textContentType="telephoneNumber"
                value={phoneNumber}
            />

            <Text style={styles.phoneHelper}>{phoneNumberScreenCopy.helper}</Text>

            {error && (
                <Text style={{ color: '#D64545', fontSize: 13, marginTop: 4 }}>
                    {error}
                </Text>
            )}

            <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: !canContinue }}
                disabled={!canContinue}
                onPress={continueToVerification}
                style={({ pressed }) => [
                    styles.primaryButton,
                    styles.phoneButton,
                    !canContinue && styles.primaryButtonDisabled,
                    pressed && canContinue && styles.primaryButtonPressed,
                ]}
            >
                <Text
                    style={[
                        styles.primaryButtonText,
                        !canContinue && styles.primaryButtonTextDisabled,
                    ]}
                >
                    {loading ? '发送中...' : phoneNumberScreenCopy.continueLabel}
                </Text>
            </Pressable>
        </View>
    );
}
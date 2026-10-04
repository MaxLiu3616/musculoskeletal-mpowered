import { useState } from 'react';
import { View } from 'react-native';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

import { styles } from './SettingScreen.styles';

type ChangePhoneScreenProps = {
    onBack: () => void;
    onContinue: (newPhone: string) => void;
};

export default function ChangePhoneScreen(props: ChangePhoneScreenProps) {
    const { onBack, onContinue } = props;
    const { phone } = useSetting();

    const [newPhone, setNewPhone] = useState('');
    const canContinue = newPhone.replace(/\D/g, '').length > 0;

    return (
        <HealthScreen title="Change phone" onBack={onBack}>
            <View style={styles.field}>
                <Text style={styles.label}>Current phone number</Text>
                <Text style={styles.value}>{phone || 'Not set'}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>New phone number</Text>
                <TextInput
                    value={newPhone}
                    onChangeText={setNewPhone}
                    placeholder="Enter new phone number"
                    keyboardType="phone-pad"
                    style={styles.input}
                />
            </View>

            <Text
                accessibilityRole="button"
                onPress={() => canContinue && onContinue(newPhone)}
                style={[
                    styles.cardButtonText,
                    styles.actionButton,
                    { textAlign: 'center', paddingVertical: 12 },
                    !canContinue && styles.disabled,
                ]}
            >
                Continue
            </Text>
        </HealthScreen>
    );
}

import { router, useLocalSearchParams } from 'expo-router';

import VerifyNewPhoneScreen from '@/features/setting/components/VerifyNewPhoneScreen';

export default function VerifyNewPhoneRoute() {
    const { newPhone } = useLocalSearchParams<{ newPhone: string }>();

    return (
        <VerifyNewPhoneScreen
            newPhone={newPhone ?? ''}
            onBack={() => router.back()}
            onVerified={() => router.dismissTo('/setting/account')}
        />
    );
}
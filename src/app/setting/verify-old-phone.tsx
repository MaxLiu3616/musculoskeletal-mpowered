import { router, useLocalSearchParams } from 'expo-router';

import VerifyOldPhoneScreen from '@/features/setting/components/VerifyOldPhoneScreen';

export default function VerifyOldPhoneRoute() {
    const { newPhone } = useLocalSearchParams<{ newPhone: string }>();

    return (
        <VerifyOldPhoneScreen
            newPhone={newPhone ?? ''}
            onBack={() => router.back()}
            onVerified={() => router.dismissTo('/setting/account')}
        />
    );
}
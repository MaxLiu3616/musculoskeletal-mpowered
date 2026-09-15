import { router } from 'expo-router';

import VerifyIdentityScreen from '@/features/setting/components/VerifyIdentityScreen';

export default function VerifyIdentityRoute() {
    return (
        <VerifyIdentityScreen
            onBack={() => router.back()}
            onVerified={() => router.push('/setting/change-phone')}
        />
    );
}
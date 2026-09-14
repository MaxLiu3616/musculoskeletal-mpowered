import { router } from 'expo-router';

import ChangePasswordScreen from '@/features/setting/components/ChangePasswordScreen';

export default function ChangePasswordRoute() {
    return (
        <ChangePasswordScreen
            onBack={() => router.back()}
            onDone={() => router.dismissTo('/setting/account')}
        />
    );
}
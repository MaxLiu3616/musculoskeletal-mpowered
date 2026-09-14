import { router } from 'expo-router';

import SetPasswordScreen from '@/features/setting/components/SetPasswordScreen';

export default function SetPasswordRoute() {
    return (
        <SetPasswordScreen
            onBack={() => router.back()}
            onDone={() => router.dismissTo('/setting/account')}
        />
    );
}
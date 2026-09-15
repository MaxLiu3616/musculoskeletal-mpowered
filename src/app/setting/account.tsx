import { router } from 'expo-router';

import AccountSettingsScreen from '@/features/setting/components/AccountSettingScreen';

export default function AccountSettingsRoute() {
    return (
        <AccountSettingsScreen
            onBack={() => router.back()}
            onChangePhone={() => router.push('/setting/verify-identity')}
            onSetPassword={() => router.push('/setting/set-password')}
            onChangePassword={() => router.push('/setting/change-password')}
        />
    );
}
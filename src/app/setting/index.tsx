import { router } from 'expo-router';

import SettingScreen from '@/features/setting/components/SettingScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

export default function SettingRoute() {
    const { setName } = useOnboarding();

    const logout = () => {
        setName('');
        router.dismissTo('/onboarding/greeting');
    };

    return (
        <SettingScreen
            onAccount={() => router.push('/setting/account')}
            onNotifications={() => router.push('/setting/notifications')}
            onSupportPeople={() => router.push('/setting/support-people')}
            onDisplay={() => router.push('/setting/display')}
            onLogout={logout}
        />
    );
}
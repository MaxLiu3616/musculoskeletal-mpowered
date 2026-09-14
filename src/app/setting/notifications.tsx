import { router } from 'expo-router';

import NotificationsSettingScreen from '@/features/setting/components/NotificationsSettingScreen';

export default function NotificationsSettingsRoute() {
    return <NotificationsSettingScreen onBack={() => router.back()} />;
}
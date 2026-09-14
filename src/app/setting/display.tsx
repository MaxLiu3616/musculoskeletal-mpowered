import { router } from 'expo-router';

import DisplaySettingScreen from '@/features/setting/components/DisplaySettingScreen';

export default function DisplaySettingsRoute() {
    return <DisplaySettingScreen onBack={() => router.back()} />;
}
import { router } from 'expo-router';

import HelpSupportScreen from '@/features/setting/components/HelpSupportScreen';

export default function HelpSupportRoute() {
    return (
        <HelpSupportScreen
            onBack={() => router.back()}
        />
    );
}
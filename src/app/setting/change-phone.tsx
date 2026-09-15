import { router } from 'expo-router';

import ChangePhoneScreen from '@/features/setting/components/ChangePhoneScreen';

export default function ChangePhoneRoute() {
    return (
        <ChangePhoneScreen
            onBack={() => router.back()}
            onContinue={(newPhone) =>
                router.push({
                    pathname: '/setting/verify-new-phone',
                    params: { newPhone },
                })
            }
        />
    );
}
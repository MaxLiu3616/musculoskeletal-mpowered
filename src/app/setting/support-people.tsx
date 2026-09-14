import { router } from 'expo-router';

import SupportPeopleSettingsScreen from '@/features/setting/components/SupportPeopleSettingScreen';

export default function SupportPeopleSettingsRoute() {
    return (
        <SupportPeopleSettingsScreen
            onBack={() => router.back()}
            onAddPerson={() => router.push('/setting/add-support-person')}
            onEditPerson={(id) =>
                router.push({
                    pathname: '/setting/add-support-person',
                    params: { id },
                })
            }
        />
    );
}
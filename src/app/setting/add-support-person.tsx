import { router, useLocalSearchParams } from 'expo-router';

import AddSupportPersonScreen from '@/features/setting/components/AddSupportPersonScreen';

export default function AddSupportPersonRoute() {
    const { id } = useLocalSearchParams<{ id?: string }>();

    return (
        <AddSupportPersonScreen
            editingId={id}
            onBack={() => router.back()}
            onDone={() => router.dismissTo('/setting/support-people')}
        />
    );
}
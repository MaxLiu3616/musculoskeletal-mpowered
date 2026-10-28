import { router, useLocalSearchParams } from 'expo-router';

import AddSupportPersonScreen from '@/features/setting/components/AddSupportPersonScreen';
import HealthScreen from '@/features/my-health/components/HealthScreen';
import { AppText as Text } from '@/components/typography';
import { useSetting } from '@/features/setting/SettingContext';
import { CareButton } from '@/features/care-planner/components/CarePlannerUI';

export default function AddSupportPersonRoute() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const { supportPeople, supportPeopleLoading, supportPeopleError, reloadSupportPeople, supportPeopleAccountId } = useSetting();

    if (id && !supportPeople.some((person) => person.id === id)) {
        return <HealthScreen title="Edit Support Person" onBack={() => router.dismissTo('/setting/support-people')}>
            <Text>{supportPeopleLoading ? 'Loading support person…' : supportPeopleError || 'This support person is no longer available.'}</Text>
            {supportPeopleError ? <CareButton label="Try again" onPress={() => void reloadSupportPeople()} /> : null}
        </HealthScreen>;
    }

    return (
        <AddSupportPersonScreen
            key={`${supportPeopleAccountId}:${id ?? 'new'}`}
            editingId={id}
            onBack={() => router.back()}
            onDone={() => router.dismissTo('/setting/support-people')}
        />
    );
}

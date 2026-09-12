import { router } from 'expo-router';

import PrescriptionsScreen from '@/features/my-health/components/PrescriptionsScreen';

export default function PrescriptionsRoute() {
  return <PrescriptionsScreen
    onBack={() => router.dismissTo('/my-health')}
    onAdd={() => router.push('/my-health/prescriptions/add')}
    onEdit={(id) => router.push({ pathname: '/my-health/prescriptions/[id]', params: { id } })}
  />;
}

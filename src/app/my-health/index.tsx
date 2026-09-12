import { router } from 'expo-router';

import MyHealthScreen from '@/features/my-health/components/MyHealthScreen';

export default function MyHealthRoute() {
  return <MyHealthScreen
    onProfile={() => router.push('/my-health/profile')}
    onTracking={() => router.push('/my-health/tracking')}
    onPrescriptions={() => router.push('/my-health/prescriptions')}
    onHome={() => router.replace('/home')}
    onCarePlanner={() => router.replace('/care-planner')}
  />;
}

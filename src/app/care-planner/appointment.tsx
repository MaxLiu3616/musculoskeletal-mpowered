import { router } from 'expo-router';

import AppointmentFormScreen from '@/features/care-planner/components/AppointmentFormScreen';

export default function AppointmentRoute() {
  return <AppointmentFormScreen onBack={() => router.dismissTo('/care-planner')} onContinue={() => router.push('/care-planner/support')} />;
}

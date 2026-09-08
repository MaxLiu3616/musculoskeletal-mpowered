import { router } from 'expo-router';

import PrescriptionFormScreen from '@/features/my-health/components/PrescriptionFormScreen';
import { useMyHealth } from '@/features/my-health/MyHealthContext';

export default function AddPrescriptionRoute() {
  const { savePrescription } = useMyHealth();
  return <PrescriptionFormScreen
    onBack={() => router.dismissTo('/my-health/prescriptions')}
    onSave={(input) => { savePrescription(input); router.dismissTo('/my-health/prescriptions'); }}
  />;
}

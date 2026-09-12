import { Redirect, router, useLocalSearchParams } from 'expo-router';

import PrescriptionFormScreen from '@/features/my-health/components/PrescriptionFormScreen';
import { useMyHealth } from '@/features/my-health/MyHealthContext';

export default function EditPrescriptionRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { prescriptions, savePrescription } = useMyHealth();
  const prescription = prescriptions.find((item) => item.id === id);
  if (!prescription) return <Redirect href="/my-health/prescriptions" />;
  return <PrescriptionFormScreen
    key={id}
    initialValue={prescription}
    onBack={() => router.dismissTo('/my-health/prescriptions')}
    onSave={(input) => { savePrescription(input, id); router.dismissTo('/my-health/prescriptions'); }}
  />;
}

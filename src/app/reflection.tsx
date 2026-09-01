import { router } from 'expo-router';

import ReflectionScreen from '@/features/reflection/components/ReflectionScreen';

export default function ReflectionRoute() {
  return (
    <ReflectionScreen
      onBack={() => router.back()}
      onPainTrackerPress={() =>
        router.replace('/home')
      }
      onSave={() => router.back()}
    />
  );
}

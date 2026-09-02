import { router } from 'expo-router';

import ExerciseScreen from '@/features/management-assessment/components/ExerciseScreen';

export default function ExerciseRoute() {
  return (
    <ExerciseScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/management/emotion')}
    />
  );
}

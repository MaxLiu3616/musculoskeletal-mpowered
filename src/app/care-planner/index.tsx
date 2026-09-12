import { router } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import CarePlannerScreen from '@/features/care-planner/components/CarePlannerScreen';
import { useMyHealth } from '@/features/my-health/MyHealthContext';

export default function CarePlannerRoute() {
  const { startPlan } = useCarePlanner();
  const { records } = useMyHealth();
  return <CarePlannerScreen
    onNew={() => { startPlan(records); router.push('/care-planner/appointment'); }}
    onView={(id) => router.push({ pathname: '/care-planner/[id]', params: { id } })}
    onHome={() => router.replace('/home')}
    onMyHealth={() => router.replace('/my-health')}
  />;
}

import { router, useNavigation, type NativeStackNavigationProp } from 'expo-router';

import SettingScreen from '@/features/setting/components/SettingScreen';
import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { useReflection } from '@/features/reflection/ReflectionContext';
import { useSetting } from '@/features/setting/SettingContext';

export default function SettingRoute() {
    const navigation = useNavigation<NativeStackNavigationProp<{ index: undefined }>>('/');
    const { reset: resetOnboarding } = useOnboarding();
    const { reset: resetAssessments } = useHomeAssessment();
    const { reset: resetHealth } = useMyHealth();
    const { reset: resetPlanner } = useCarePlanner();
    const { reset: resetSettings } = useSetting();
    const { saveNotes } = useReflection();

    const logout = () => {
        resetOnboarding();
        resetAssessments();
        resetHealth();
        resetPlanner();
        resetSettings();
        saveNotes('');
        // Discard cached screens, assessment drafts, and account route parameters.
        navigation.reset({ index: 0, routes: [{ name: 'index' }] });
    };

    return (
        <SettingScreen
            onAccount={() => router.push('/setting/account')}
            onNotifications={() => router.push('/setting/notifications')}
            onSupportPeople={() => router.push('/setting/support-people')}
            onDisplay={() => router.push('/setting/display')}
            onHelpSupport={() => router.push('/setting/help-support')}
            onLogout={logout}
        />
    );
}

import { Text } from 'react-native';

import { useOnboarding } from '@/features/onboarding/OnboardingContext';

import { healthProfileSections } from '../HealthProfile.data';
import { healthReportHtml } from '../HealthReport.data';
import { myHealthCopy } from '../MyHealth.data';
import { useMyHealth } from '../MyHealthContext';
import HealthExportActions from './HealthExportActions';
import HealthScreen from './HealthScreen';
import HealthSectionCard from './HealthSectionCard';
import { styles } from './MyHealthScreen.styles';

export default function HealthProfileScreen({ onBack }: { onBack: () => void }) {
  const { records } = useMyHealth();
  const { name, profile } = useOnboarding();
  const sections = healthProfileSections(name, profile, records);
  return (
    <HealthScreen title="My Pain Profile" onBack={onBack}>
      <Text style={styles.subtitle}>A summary of your information and latest completed assessments.</Text>
      <HealthExportActions html={healthReportHtml('My Pain Profile', sections)} />
      {sections.map((section) => <HealthSectionCard key={section.title} section={section} />)}
      <Text style={styles.sessionNote}>{myHealthCopy.sessionNote}</Text>
    </HealthScreen>
  );
}

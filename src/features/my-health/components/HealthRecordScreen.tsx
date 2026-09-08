import { Pressable, Text } from 'react-native';

import { useMyHealth } from '../MyHealthContext';
import { assessmentLabels, formatWeek, myHealthCopy } from '../MyHealth.data';
import HealthScreen from './HealthScreen';
import HealthSectionCard from './HealthSectionCard';
import { styles } from './MyHealthScreen.styles';

export default function HealthRecordScreen({ id, onBack }: { id: string; onBack: () => void }) {
  const { records } = useMyHealth();
  const record = records.find((item) => item.id === id);
  return (
    <HealthScreen title={record ? `${assessmentLabels[record.type]} Summary` : 'Assessment record'} onBack={onBack}>
      {record ? <>
        <Text style={styles.subtitle}>Period: {record.periodLabel ?? formatWeek(record.weekStart)}</Text>
        {record.sections.map((section) => <HealthSectionCard key={section.title} section={section} />)}
        <Text style={styles.sessionNote}>{myHealthCopy.sessionNote}</Text>
      </> : <Text style={styles.subtitle}>This record is no longer available in this session.</Text>}
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.primaryButton}><Text style={styles.primaryText}>Close</Text></Pressable>
    </HealthScreen>
  );
}

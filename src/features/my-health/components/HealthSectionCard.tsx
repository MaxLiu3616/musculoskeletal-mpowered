import { Text, View } from 'react-native';

import type { HealthSection } from '../MyHealth.types';
import { styles } from './MyHealthScreen.styles';

export default function HealthSectionCard({ section }: { section: HealthSection }) {
  return (
    <View style={styles.card}>
      <Text accessibilityRole="header" style={styles.cardTitle}>{section.title}</Text>
      <View style={styles.divider} />
      {section.items.map((item) => (
        <View key={item.label} style={styles.result}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

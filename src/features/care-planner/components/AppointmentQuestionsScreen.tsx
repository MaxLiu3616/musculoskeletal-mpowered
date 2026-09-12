import { useState } from 'react';
import { Text, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';

import { carePlannerCopy } from '../CarePlanner.data';
import type { AppointmentPlan } from '../CarePlanner.types';
import { styles } from './CarePlanner.styles';
import { CareButton, CareCheck, CareNotice } from './CarePlannerUI';

export default function AppointmentQuestionsScreen({ plan, onBack, onSave }: { plan: AppointmentPlan; onBack: () => void; onSave: (ids: string[]) => void }) {
  const [selectedIds, setSelectedIds] = useState(plan.selectedIds);
  const categories = [...new Set(plan.questions.map((question) => question.category))];
  const toggle = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <HealthScreen title="Add Questions for My Appointment" onBack={onBack} footer={<View style={styles.footer}>
    <CareButton label={`Save${selectedIds.length ? ` (${selectedIds.length} selected)` : ''}`} disabled={!selectedIds.length} onPress={() => onSave(selectedIds)} />
  </View>}>
    <Text style={styles.subtitle}>{plan.hasAssessments
      ? 'These suggested questions use your completed assessments. Select the questions you would like to ask your healthcare practitioner.'
      : 'Here are general questions to help you prepare. Complete your assessments in Pain Tracker to personalise questions for your next plan.'}</Text>
    <CareNotice text={carePlannerCopy.questionsNote} />
    <View style={styles.panel}>
      <Text style={styles.label}>Generated on {new Date(plan.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
      <View style={styles.divider} />
      {categories.map((category) => <View key={category} style={styles.group}>
        <Text style={styles.cardTitle}>{category}</Text>
        {plan.questions.filter((question) => question.category === category).map((question) => <CareCheck key={question.id} label={question.text} checked={selectedIds.includes(question.id)} onPress={() => toggle(question.id)} />)}
      </View>)}
    </View>
  </HealthScreen>;
}

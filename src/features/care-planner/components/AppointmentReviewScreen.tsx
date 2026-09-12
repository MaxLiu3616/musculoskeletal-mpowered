import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';

import { useCarePlanner } from '../CarePlannerContext';
import { isValidPlan, selectedQuestions } from '../CarePlanner.data';
import type { AppointmentPlan, AppointmentQuestion } from '../CarePlanner.types';
import AppointmentAnswerModal from './AppointmentAnswerModal';
import { styles } from './CarePlanner.styles';
import { AppointmentOverview, CareButton } from './CarePlannerUI';

type Props = { plan: AppointmentPlan; onBack: () => void; onSave?: () => void; onQuestions: () => void; onConsent?: () => void };

export default function AppointmentReviewScreen({ plan, onBack, onSave, onQuestions, onConsent }: Props) {
  const { saveAnswer } = useCarePlanner();
  const [activeQuestion, setActiveQuestion] = useState<AppointmentQuestion | null>(null);
  const questions = selectedQuestions(plan);
  const categories = [...new Set(questions.map((question) => question.category))];
  return <HealthScreen title={onSave ? 'Review My Plan' : 'Review My Appointment Plan'} onBack={onBack} footer={<View style={styles.footer}>
    <CareButton label={onSave ? 'Save' : 'Modify questions'} outline={!onSave} disabled={onSave ? !isValidPlan(plan) : false} onPress={onSave ?? onQuestions} />
  </View>}>
    <View style={styles.panel}>
      <AppointmentOverview plan={plan} />
      <Text style={styles.cardTitle}>Questions to ask</Text>
      {onConsent ? <View style={styles.group}>
        <Pressable accessibilityRole="button" onPress={onConsent} style={styles.checkRow}>
          <Text style={styles.checkText}>{plan.consent ? 'Recording consent obtained' : 'Ask consent for recording answers'}</Text>
          <Ionicons name={plan.consent ? 'checkbox' : 'square-outline'} size={22} color="#6850A1" />
        </Pressable>
        {!plan.consent ? <Text style={styles.muted}>Ask your healthcare practitioner to sign before adding their answers.</Text> : null}
      </View> : null}
      {categories.map((category) => <View key={category} style={styles.group}>
        <Text style={styles.label}>{category}</Text>
        {questions.filter((question) => question.category === category).map((question) => <View key={question.id} style={styles.card}>
          {onConsent ? <Pressable accessibilityRole="button" accessibilityLabel={`${plan.answers[question.id] ? 'View' : 'Add'} doctor’s answer: ${question.text}`} accessibilityState={{ disabled: !plan.consent }} disabled={!plan.consent} onPress={() => setActiveQuestion(question)} style={[styles.titleRow, styles.answerButton, !plan.consent && styles.disabled]}>
            <Text style={styles.outlineText}>{plan.answers[question.id] ? 'View doctor’s answer' : 'Add doctor’s answer'}</Text>
            <Ionicons name="pencil-outline" size={20} color="#51465F" />
          </Pressable> : null}
          <Text style={styles.value}>{question.text}</Text>
        </View>)}
      </View>)}
      {onSave ? <CareButton label="Modify questions" outline onPress={onQuestions} /> : null}
    </View>
    {activeQuestion ? <AppointmentAnswerModal key={activeQuestion.id} question={activeQuestion} answer={plan.answers[activeQuestion.id]} onClose={() => setActiveQuestion(null)} onSave={(answer) => { saveAnswer(plan.id, activeQuestion.id, answer); setActiveQuestion(null); }} /> : null}
  </HealthScreen>;
}

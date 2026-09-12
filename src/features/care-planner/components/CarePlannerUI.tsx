import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

import { formatAppointmentDate } from '../CarePlanner.data';
import type { AppointmentPlan } from '../CarePlanner.types';
import { styles } from './CarePlanner.styles';

export function CareButton({ label, onPress, outline = false, disabled = false }: { label: string; onPress: () => void; outline?: boolean; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [outline ? styles.outlineButton : styles.primaryButton, disabled && styles.disabled, pressed && styles.pressed]}>
    <Text style={outline ? styles.outlineText : styles.primaryText}>{label}</Text>
  </Pressable>;
}

export function CareField({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput accessibilityLabel={label} placeholderTextColor="#79717F" {...props} style={[styles.input, props.style]} />
  </View>;
}

export function CareCheck({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="checkbox" accessibilityLabel={label} accessibilityState={{ checked }} onPress={onPress} style={[styles.checkRow, checked && styles.checkedRow]}>
    <Text style={styles.checkText}>{label}</Text>
    <Ionicons name={checked ? 'checkbox' : 'square-outline'} color={checked ? '#6850A1' : '#716979'} size={22} />
  </Pressable>;
}

export function CareNotice({ text }: { text: string }) {
  return <View style={styles.notice}><Ionicons name="bulb-outline" color="#51465F" size={22} /><Text style={styles.noticeText}>{text}</Text></View>;
}

export function AppointmentOverview({ plan }: { plan: AppointmentPlan }) {
  const rows = [
    ['Appointment date', formatAppointmentDate(plan.appointmentDate)],
    ['Doctor’s name', plan.doctorName || 'Not specified'],
    ['Health services', plan.service],
    ['Support person', plan.supportPeople.map((person) => person.name).join(', ') || 'No support person added'],
  ];
  return <View style={styles.group}>
    <Text style={styles.cardTitle}>Appointment overview</Text>
    <View style={styles.card}>{rows.map(([label, value]) => <View key={label} style={styles.result}>
      <Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text>
    </View>)}</View>
  </View>;
}

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { formatAppointmentDate, localDateKey } from '../CarePlanner.data';
import { styles } from './CarePlanner.styles';
import { CareButton } from './CarePlannerUI';

export default function AppointmentDatePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date());
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const weeks = Math.ceil((firstDay.getDay() + days) / 7);
  return <View style={styles.field}>
    <Text style={styles.label}>Appointment date</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={`Appointment date: ${value ? formatAppointmentDate(value) : 'Pick appointment date'}`} onPress={() => { setMonth(value ? new Date(`${value}T12:00:00`) : new Date()); setOpen(true); }} style={[styles.input, styles.selectButton]}>
      <Text style={styles.value}>{value ? formatAppointmentDate(value) : 'Pick appointment date'}</Text>
      <Ionicons name="calendar-outline" size={20} color="#51465F" />
    </Pressable>
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <View style={styles.modalBackdrop}><View accessibilityViewIsModal style={styles.modalCard}>
        <View style={styles.titleRow}>
          <Pressable accessibilityRole="button" accessibilityLabel="Previous month" style={styles.iconButton} onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><Ionicons name="chevron-back" size={22} color="#51465F" /></Pressable>
          <Text accessibilityRole="header" style={styles.calendarHeading}>{month.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Next month" style={styles.iconButton} onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><Ionicons name="chevron-forward" size={22} color="#51465F" /></Pressable>
        </View>
        <ScrollView style={styles.calendarGrid}>
        <View style={styles.calendarRow}>{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => <View key={day} style={styles.calendarCell}><Text style={styles.muted}>{day}</Text></View>)}</View>
        {Array.from({ length: weeks }, (_, week) => <View key={week} style={styles.calendarRow}>
          {Array.from({ length: 7 }, (_, weekday) => {
            const day = week * 7 + weekday - firstDay.getDay() + 1;
            if (day < 1 || day > days) return <View key={weekday} style={styles.calendarCell} />;
            const key = localDateKey(new Date(month.getFullYear(), month.getMonth(), day));
            return <Pressable key={weekday} accessibilityRole="button" accessibilityLabel={formatAppointmentDate(key)} accessibilityState={{ selected: value === key }} style={[styles.calendarCell, value === key && styles.calendarSelected]} onPress={() => { onChange(key); setOpen(false); }}><Text style={value === key ? styles.primaryText : styles.value}>{day}</Text></Pressable>;
          })}
        </View>)}
        </ScrollView>
        <CareButton label="Cancel" outline onPress={() => setOpen(false)} />
      </View></View>
    </Modal>
  </View>;
}

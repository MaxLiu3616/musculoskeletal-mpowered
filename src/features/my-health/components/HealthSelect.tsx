import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from './MyHealthScreen.styles';

type HealthSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

export default function HealthSelect<T extends string>({ label, value, options, onChange }: HealthSelectProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${value}`} accessibilityState={{ expanded: open }} onPress={() => setOpen(true)} style={[styles.input, styles.selectButton]}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color="#716979" />
      </Pressable>
      <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View accessibilityViewIsModal style={styles.modalCard}>
            <Text accessibilityRole="header" style={styles.cardTitle}>{label}</Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              {options.map((option) => (
                <Pressable key={option} accessibilityRole="radio" accessibilityLabel={option} accessibilityState={{ checked: value === option }} onPress={() => { onChange(option); setOpen(false); }} style={[styles.option, option === value && styles.selectedOption]}>
                  <Text style={styles.value}>{option}</Text>
                  {option === value ? <Ionicons name="checkmark" size={20} color="#6850A1" /> : null}
                </Pressable>
              ))}
            </ScrollView>
            <Pressable accessibilityRole="button" onPress={() => setOpen(false)} style={styles.outlineButton}>
              <Text style={styles.outlineText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

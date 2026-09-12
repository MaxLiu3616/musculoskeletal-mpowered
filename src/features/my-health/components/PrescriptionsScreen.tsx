import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { useMyHealth } from '../MyHealthContext';
import { myHealthCopy, prescriptionName, prescriptionSchedule } from '../MyHealth.data';
import HealthScreen from './HealthScreen';
import { styles } from './MyHealthScreen.styles';

type PrescriptionsScreenProps = {
  onBack: () => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
};

export default function PrescriptionsScreen({ onBack, onAdd, onEdit }: PrescriptionsScreenProps) {
  const { prescriptions, removePrescription } = useMyHealth();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const removing = prescriptions.find((item) => item.id === removingId);
  const addButton = (
    <Pressable accessibilityRole="button" onPress={onAdd} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
      <Text style={styles.secondaryText}>{prescriptions.length ? 'Add prescriptions' : 'Add prescription'}</Text>
    </Pressable>
  );
  return (
    <HealthScreen title="My Prescriptions" onBack={onBack} footer={prescriptions.length ? <View style={styles.footer}>{addButton}</View> : null}>
      <Modal transparent visible={!!removing} animationType="fade" onRequestClose={() => setRemovingId(null)}>
        <View style={styles.modalBackdrop}>
        {removing ? <View accessibilityViewIsModal style={styles.modalCard}>
          <Text style={styles.value}>Remove {prescriptionName(removing)} from your prescriptions?</Text>
          <View style={styles.row}>
            <Pressable accessibilityRole="button" onPress={() => setRemovingId(null)} style={[styles.outlineButton, styles.column]}><Text style={styles.outlineText}>Cancel</Text></Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Confirm remove prescription" onPress={() => { removePrescription(removing.id); setRemovingId(null); }} style={[styles.outlineButton, styles.column]}><Text style={styles.deleteText}>Remove</Text></Pressable>
          </View>
        </View> : null}
        </View>
      </Modal>
      {prescriptions.length ? (
        <View style={styles.prescriptionList}>
          {prescriptions.map((prescription) => (
            <View style={styles.prescriptionRow} key={prescription.id}>
              <View style={styles.prescriptionText}>
                <Text style={styles.label}>{prescriptionName(prescription)}</Text>
                <Text style={styles.muted}>{prescriptionSchedule(prescription)}</Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${prescription.name}`} onPress={() => onEdit(prescription.id)} style={styles.iconButton}><Ionicons name="pencil-outline" size={21} color="#17151B" /></Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${prescription.name}`} onPress={() => setRemovingId(prescription.id)} style={styles.iconButton}><Ionicons name="trash-outline" size={21} color="#17151B" /></Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>{myHealthCopy.prescriptionEmpty}</Text>
          {addButton}
        </View>
      )}
      <Text style={styles.sessionNote}>{myHealthCopy.sessionNote}</Text>
    </HealthScreen>
  );
}

import { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import { emptyPrescription, isValidPrescription, medicationForms, strengthUnits, timeUnits } from '../MyHealth.data';
import type { PrescriptionInput } from '../MyHealth.types';
import HealthScreen from './HealthScreen';
import HealthSelect from './HealthSelect';
import { styles } from './MyHealthScreen.styles';

type PrescriptionFormScreenProps = {
  initialValue?: PrescriptionInput;
  onBack: () => void;
  onSave: (input: PrescriptionInput) => void;
};

export default function PrescriptionFormScreen({ initialValue, onBack, onSave }: PrescriptionFormScreenProps) {
  const [input, setInput] = useState(initialValue ?? emptyPrescription);
  const canSave = isValidPrescription(input);
  const update = <K extends keyof PrescriptionInput>(key: K, value: PrescriptionInput[K]) => {
    setInput((current) => ({ ...current, [key]: value }));
  };
  const save = () => {
    if (!canSave) return;
    Keyboard.dismiss();
    onSave(input);
  };
  return (
    <HealthScreen title={initialValue ? 'Edit prescription' : 'Add prescription'} onBack={onBack} footer={
      <View style={styles.footer}>
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: !canSave }} disabled={!canSave} onPress={save} style={({ pressed }) => [styles.primaryButton, !canSave && styles.disabled, pressed && styles.pressed]}><Text style={styles.primaryText}>Save medication</Text></Pressable>
      </View>
    }>
      <Text style={styles.subtitle}>Type the name of your medication</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Medication name</Text>
        <TextInput accessibilityLabel="Medication name" value={input.name} onChangeText={(value) => update('name', value)} style={styles.input} autoCorrect={false} />
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Strength</Text>
          <TextInput accessibilityLabel="Strength" value={input.strength} onChangeText={(value) => update('strength', value)} inputMode="decimal" style={styles.input} />
        </View>
        <View style={styles.column}><HealthSelect label="Strength unit" value={input.strengthUnit} options={strengthUnits} onChange={(value) => update('strengthUnit', value)} /></View>
      </View>
      <HealthSelect label="Form" value={input.form} options={medicationForms} onChange={(value) => update('form', value)} />
      <View style={styles.formSection}>
        <Text style={styles.cardTitle}>Dosage</Text>
        <View style={styles.field}>
          <Text style={styles.label}>How many per application</Text>
          <TextInput accessibilityLabel="How many per application" value={input.dosage} onChangeText={(value) => update('dosage', value)} inputMode="decimal" style={styles.input} />
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Repeat every</Text>
            <TextInput accessibilityLabel="Repeat every" value={input.repeatEvery} onChangeText={(value) => update('repeatEvery', value)} inputMode="numeric" style={styles.input} />
          </View>
          <View style={styles.column}><HealthSelect label="Unit of time" value={input.timeUnit} options={timeUnits} onChange={(value) => update('timeUnit', value)} /></View>
        </View>
        <Text style={styles.muted}>Enter a medication name and positive values for strength, dosage and repeat interval.</Text>
      </View>
    </HealthScreen>
  );
}

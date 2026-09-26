import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Keyboard, View } from 'react-native';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';
import HealthScreen from '@/features/my-health/components/HealthScreen';
import { CareButton } from '@/features/care-planner/components/CarePlannerUI';
import { useReflection } from '@/features/reflection/ReflectionContext';
import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { colors } from '@/theme';
import { reflectionScreenCopy } from './ReflectionScreen.data';
import { styles } from './ReflectionScreen.styles';

type ReflectionScreenProps = { onBack: () => void; onSave: () => void };

export default function ReflectionScreen({ onBack, onSave }: ReflectionScreenProps) {
  const { savedNotes, saveNotes } = useReflection();
  const { cyclePeriodLabel } = useHomeAssessment();
  const [notes, setNotes] = useState(savedNotes);
  const saveReflection = () => {
    saveNotes(notes.trim());
    Keyboard.dismiss();
    onSave();
  };
  return (
    <HealthScreen title="Reflection" onBack={() => { Keyboard.dismiss(); onBack(); }}
      footer={<View style={styles.footer}><CareButton label="Save reflection" onPress={saveReflection} /></View>}>
      {cyclePeriodLabel ? <View style={styles.period}>
        <Ionicons name="calendar-outline" size={22} color={colors.ink} />
        <Text style={styles.periodLabel}>{cyclePeriodLabel}</Text>
      </View> : null}
      <View style={styles.card}>
        <Ionicons name="pencil-outline" size={30} color={colors.ink} />
        <Text style={styles.title}>Your week, in words.</Text>
        <Text style={styles.prompt}>{reflectionScreenCopy.prompt}</Text>
        <TextInput accessibilityLabel={reflectionScreenCopy.prompt} multiline
          onChangeText={setNotes} placeholder={reflectionScreenCopy.placeholder}
          placeholderTextColor={colors.muted} selectionColor={colors.primary}
          style={styles.input} value={notes} />
      </View>
    </HealthScreen>
  );
}

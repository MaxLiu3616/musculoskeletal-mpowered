import { Text, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import HealthSelect from '@/features/my-health/components/HealthSelect';

import { useCarePlanner } from '../CarePlannerContext';
import { carePlannerCopy, healthServices, isValidAppointmentDate } from '../CarePlanner.data';
import AppointmentDatePicker from './AppointmentDatePicker';
import { styles } from './CarePlanner.styles';
import { CareButton, CareField } from './CarePlannerUI';

export default function AppointmentFormScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const { draft, updateDraft } = useCarePlanner();
  return <HealthScreen title="Plan My Appointment" onBack={onBack} footer={<View style={styles.footer}><CareButton label="Save" disabled={!isValidAppointmentDate(draft.appointmentDate)} onPress={() => { updateDraft({ doctorName: draft.doctorName.trim() }); onContinue(); }} /></View>}>
    <Text style={styles.subtitle}>{carePlannerCopy.bookingNote}</Text>
    <View style={styles.panel}>
      <AppointmentDatePicker value={draft.appointmentDate} onChange={(appointmentDate) => updateDraft({ appointmentDate })} />
      <CareField label="Doctor’s name (optional)" placeholder="Type healthcare practitioner name" value={draft.doctorName} onChangeText={(doctorName) => updateDraft({ doctorName })} />
      <HealthSelect label="Health services (optional)" value={draft.service} options={healthServices} onChange={(service) => updateDraft({ service })} />
    </View>
  </HealthScreen>;
}

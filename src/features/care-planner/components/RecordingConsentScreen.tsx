import { useState } from 'react';
import { Text, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';

import { hasSignature } from '../CarePlanner.data';
import type { AppointmentPlan } from '../CarePlanner.types';
import { styles } from './CarePlanner.styles';
import { AppointmentOverview, CareButton } from './CarePlannerUI';
import SignaturePad from './SignaturePad';

export default function RecordingConsentScreen({ plan, onBack, onSave }: { plan: AppointmentPlan; onBack: () => void; onSave: (paths: string[]) => void }) {
  const [paths, setPaths] = useState<string[]>([]);
  const signed = !!plan.consent;
  return <HealthScreen title="Ask for Recording Consent" onBack={onBack} footer={<View style={styles.footer}>
    <CareButton label={signed ? 'Close' : 'Save'} disabled={!signed && !hasSignature(paths)} onPress={() => signed ? onBack() : onSave(paths)} />
  </View>}>
    <View style={styles.panel}>
      <AppointmentOverview plan={plan} />
      <Text style={styles.label}>Doctor’s signature</Text>
      <SignaturePad paths={plan.consent?.paths ?? paths} onChange={setPaths} readOnly={signed} />
      {!signed ? <CareButton label="Clear signature" outline disabled={!paths.length} onPress={() => setPaths([])} /> : null}
      <Text style={styles.subtitle}>By giving my signature, I agree for the patient to record today’s consultation.</Text>
      {plan.consent ? <Text style={styles.success}>Consent recorded on {new Date(plan.consent.signedAt).toLocaleString('en-AU')}.</Text> : <Text style={styles.muted}>Please ask your healthcare practitioner to sign before typing or recording their answers.</Text>}
    </View>
  </HealthScreen>;
}

import { useState } from 'react';
import { Modal, Platform, Text, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { pickSupportContact } from '@/services/support-contact';

import { useCarePlanner } from '../CarePlannerContext';
import { carePlannerCopy, emptySupportPerson, isValidSupportPerson } from '../CarePlanner.data';
import type { SupportPerson } from '../CarePlanner.types';
import { styles } from './CarePlanner.styles';
import { CareButton, CareCheck, CareField, CareNotice } from './CarePlannerUI';

export default function SupportPeopleScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const { draft, updateDraft } = useCarePlanner();
  const [people, setPeople] = useState<SupportPerson[]>(() => draft.supportPeople.length ? draft.supportPeople : [emptySupportPerson()]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [phoneChoice, setPhoneChoice] = useState<{ index: number; phones: string[] } | null>(null);
  const updatePerson = (index: number, changes: Partial<SupportPerson>) => setPeople((current) => current.map((person, i) => i === index ? { ...person, ...changes } : person));
  const chooseContact = async (index: number) => {
    setError(''); setBusy(true);
    try {
      const contact = await pickSupportContact();
      if (contact) {
        updatePerson(index, { name: contact.name, email: contact.email, phone: contact.phones.length === 1 ? contact.phones[0] : '' });
        if (contact.phones.length > 1) setPhoneChoice({ index, phones: contact.phones });
        if (!contact.phones.length) setError('This contact has no phone number. Please enter one.');
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'The contact could not be opened. You can enter the details manually.'); }
    finally { setBusy(false); }
  };
  const save = () => {
    updateDraft({ supportPeople: people.map((person) => ({ ...person, name: person.name.trim(), phone: person.phone.trim(), email: person.email.trim() })) });
    onContinue();
  };
  return <HealthScreen title="Add a Support Person" onBack={onBack} footer={<View style={styles.footerRow}>
    <View style={styles.flex}><CareButton label="Skip" outline onPress={() => { updateDraft({ supportPeople: [] }); onContinue(); }} /></View>
    <View style={styles.flex}><CareButton label="Save" disabled={!people.every(isValidSupportPerson) || busy} onPress={save} /></View>
  </View>}>
    <CareNotice text={carePlannerCopy.supportNote} />
    {people.map((person, index) => <View key={index} style={styles.panel}>
      {people.length > 1 ? <Text style={styles.cardTitle}>Support person {index + 1}</Text> : null}
      <CareField label={`Support person ${index + 1} name`} placeholder="Name" value={person.name} onChangeText={(name) => updatePerson(index, { name })} />
      <CareField label={`Support person ${index + 1} phone number`} placeholder="Phone number" keyboardType="phone-pad" value={person.phone} onChangeText={(phone) => updatePerson(index, { phone })} />
      {Platform.OS !== 'web' ? <CareButton label={`Choose contact for person ${index + 1}`} outline disabled={busy} onPress={() => chooseContact(index)} /> : null}
      <CareField label={`Support person ${index + 1} email (optional)`} placeholder="Email address" keyboardType="email-address" autoCapitalize="none" value={person.email} onChangeText={(email) => updatePerson(index, { email })} />
      <View style={styles.group}>
        <Text style={styles.label}>Access type</Text>
        <CareCheck label="Add questions" checked={person.addQuestions} onPress={() => updatePerson(index, { addQuestions: !person.addQuestions })} />
        <CareCheck label="Add doctor’s answer" checked={person.addAnswers} onPress={() => updatePerson(index, { addAnswers: !person.addAnswers })} />
      </View>
      {people.length > 1 ? <CareButton label={`Remove person ${index + 1}`} outline onPress={() => setPeople((current) => current.filter((_, i) => i !== index))} /> : null}
    </View>)}
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    {people.length < 2 ? <CareButton label="Add another person" outline onPress={() => setPeople((current) => current.length < 2 ? [...current, emptySupportPerson()] : current)} /> : null}
    <Text style={styles.muted}>Enter a name and phone number for each person. Email is optional.</Text>
    <Text style={styles.sessionNote}>{carePlannerCopy.accessNote}</Text>
    <Modal visible={!!phoneChoice} transparent onRequestClose={() => setPhoneChoice(null)}>
      <View style={styles.modalBackdrop}><View accessibilityViewIsModal style={styles.modalCard}>
        <Text style={styles.cardTitle}>Choose a phone number</Text>
        {phoneChoice?.phones.map((phone, index) => <CareButton key={index} label={phone} outline onPress={() => { updatePerson(phoneChoice.index, { phone }); setPhoneChoice(null); }} />)}
        <CareButton label="Cancel" outline onPress={() => setPhoneChoice(null)} />
      </View></View>
    </Modal>
  </HealthScreen>;
}

import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { AppText as Text } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import SupportContactPicker from '@/components/SupportContactPicker';
import { useSetting } from '@/features/setting/SettingContext';
import { getSupportPersonError, sameSupportPerson } from '@/features/setting/SupportPeople.data';

import { useCarePlanner } from '../CarePlannerContext';
import { carePlannerCopy, emptySupportPerson } from '../CarePlanner.data';
import type { SupportPerson } from '../CarePlanner.types';
import { styles } from './CarePlanner.styles';
import { CareButton, CareCheck, CareField, CareNotice } from './CarePlannerUI';

export default function SupportPeopleScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const { draft, updateDraft } = useCarePlanner();
  const { supportPeople: savedPeople, addSupportPerson, supportPeopleLoading, supportPeopleError, reloadSupportPeople } = useSetting();
  const focused = useRef(false);
  useFocusEffect(useCallback(() => {
    focused.current = true;
    void reloadSupportPeople();
    return () => { focused.current = false; };
  }, [reloadSupportPeople]));
  const [people, setPeople] = useState<SupportPerson[]>(() => draft.supportPeople.length ? draft.supportPeople : [emptySupportPerson()]);
  const [error, setError] = useState('');
  const [pickingContact, setPickingContact] = useState(false);
  const [saving, setSaving] = useState(false);
  const submitting = useRef(false);
  const busy = pickingContact || saving;
  const updatePerson = (index: number, changes: Partial<SupportPerson>) => setPeople((current) => current.map((person, i) => i === index ? { ...person, ...changes } : person));
  const save = async () => {
    if (busy || submitting.current || supportPeopleLoading || supportPeopleError) return;
    const validationError = people.map(getSupportPersonError).find(Boolean);
    if (validationError) { setError(validationError); return; }
    if (people.length === 2 && sameSupportPerson(people[0], people[1])) {
      setError('Choose a different person for the second support person.');
      return;
    }
    submitting.current = true;
    setSaving(true);
    setError('');
    try {
      for (const person of people) {
        if (!focused.current) return;
        if (!savedPeople.some((saved) => sameSupportPerson(saved, person))) {
          await addSupportPerson({ name: person.name, phone: person.phone, email: person.email,
            canAddQuestions: person.addQuestions, canViewAnswers: false });
        }
      }
      if (!focused.current) return;
      updateDraft({ supportPeople: people.map((person) => ({ ...person, name: person.name.trim(), phone: person.phone.trim(), email: person.email.trim() })) });
      onContinue();
    } catch {
      setError('Could not save support people. Your details are still here. Check your connection and try again.');
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };
  return <HealthScreen title="Support people" onBack={busy ? undefined : onBack} footer={<View style={styles.footerRow}>
    <View style={styles.flex}><CareButton label="Skip" outline disabled={busy} onPress={() => { setPeople([emptySupportPerson()]); setError(''); updateDraft({ supportPeople: [] }); onContinue(); }} /></View>
    <View style={styles.flex}><CareButton label={saving ? 'Saving…' : 'Save'} disabled={busy || supportPeopleLoading || !!supportPeopleError} onPress={() => void save()} /></View>
  </View>}>
    <CareNotice text={carePlannerCopy.supportNote} />
    {supportPeopleLoading ? <Text style={styles.muted}>Loading saved people…</Text> : null}
    {supportPeopleError ? <View style={styles.group}>
      <Text accessibilityRole="alert" style={styles.error}>{supportPeopleError}</Text>
      <CareButton label="Try again" outline onPress={() => void reloadSupportPeople()} />
    </View> : null}
    {savedPeople.length ? <View style={styles.panel}>
      <Text style={styles.cardTitle}>Choose a saved person</Text>
      {savedPeople.map((saved) => {
        const selected = people.some((person) => sameSupportPerson(person, saved));
        const emptyIndex = people.findIndex((person) => !person.name.trim() && !person.phone.trim() && !person.email.trim());
        return <CareButton key={saved.id} label={`${saved.name}${selected ? ' — added' : ''}`} outline
          disabled={busy || selected || (people.length >= 2 && emptyIndex < 0)} onPress={() => {
            const person = { name: saved.name, phone: saved.phone, email: saved.email,
              addQuestions: saved.canAddQuestions, addAnswers: false };
            setPeople((current) => emptyIndex >= 0 ? current.map((value, index) => index === emptyIndex ? person : value) : [...current, person]);
          }} />;
      })}
    </View> : null}
    {people.map((person, index) => <View key={index} style={styles.panel}>
      {people.length > 1 ? <Text style={styles.cardTitle}>Support person {index + 1}</Text> : null}
      <CareField label={`Support person ${index + 1} name`} editable={!busy} placeholder="Name" value={person.name} onChangeText={(name) => updatePerson(index, { name })} />
      <CareField label={`Support person ${index + 1} phone number`} editable={!busy} placeholder="Phone number" keyboardType="phone-pad" value={person.phone} onChangeText={(phone) => updatePerson(index, { phone })} />
      <SupportContactPicker label={`Choose contact for person ${index + 1}`} disabled={busy} onBusyChange={setPickingContact} onSelect={(contact) => updatePerson(index, contact)} />
      <CareField label={`Support person ${index + 1} email (optional)`} editable={!busy} placeholder="Email address" keyboardType="email-address" autoCapitalize="none" value={person.email} onChangeText={(email) => updatePerson(index, { email })} />
      <View style={styles.group}>
        <Text style={styles.label}>Access type</Text>
        <CareCheck label="Add questions" checked={person.addQuestions} disabled={busy} onPress={() => updatePerson(index, { addQuestions: !person.addQuestions })} />
        <CareCheck label="Add doctor’s answer" checked={person.addAnswers} disabled={busy} onPress={() => updatePerson(index, { addAnswers: !person.addAnswers })} />
      </View>
      <CareButton label={`Remove person ${index + 1}`} outline disabled={busy} onPress={() => setPeople((current) => current.length === 1 ? [emptySupportPerson()] : current.filter((_, i) => i !== index))} />
    </View>)}
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    {people.length < 2 ? <CareButton label="Add another person" outline disabled={busy} onPress={() => setPeople((current) => current.length < 2 ? [...current, emptySupportPerson()] : current)} /> : null}
    <Text style={styles.muted}>Enter a name and phone number for each person. Email is optional.</Text>
    <Text style={styles.muted}>New people are also saved to your account for future appointments.</Text>
    <Text style={styles.sessionNote}>{carePlannerCopy.accessNote}</Text>
  </HealthScreen>;
}

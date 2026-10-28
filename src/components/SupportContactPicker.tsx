import { useEffect, useRef, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/typography';
import { pickSupportContact } from '@/services/support-contact';
import { colors } from '@/theme';

type Contact = NonNullable<Awaited<ReturnType<typeof pickSupportContact>>>;
type Props = {
  label: string;
  disabled?: boolean;
  onSelect: (contact: { name: string; phone: string; email: string }) => void;
  onBusyChange: (busy: boolean) => void;
};

export default function SupportContactPicker({ label, disabled, onSelect, onBusyChange }: Props) {
  const [choice, setChoice] = useState<Contact | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const active = useRef(true);
  const picking = useRef(false);
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; };
  }, []);

  const finish = () => {
    picking.current = false;
    setBusy(false);
    setChoice(null);
    onBusyChange(false);
  };
  const choose = async () => {
    if (picking.current) return;
    picking.current = true;
    setBusy(true);
    setError('');
    onBusyChange(true);
    let awaitingPhone = false;
    try {
      const contact = await pickSupportContact();
      if (!active.current) return;
      if (contact && contact.phones.length > 1) {
        awaitingPhone = true;
        setChoice(contact);
        return;
      }
      if (contact) {
        onSelect({ name: contact.name, phone: contact.phones[0] ?? '', email: contact.email });
        if (!contact.phones.length) setError('This contact has no phone number. Please enter one.');
      }
    } catch (cause) {
      if (active.current) setError(cause instanceof Error ? cause.message : 'Could not open contacts. Enter the details manually.');
    } finally {
      if (active.current && !awaitingPhone) finish();
    }
  };

  if (Platform.OS === 'web') return null;
  return <View style={styles.group}>
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: !!disabled || busy }}
      disabled={disabled || busy} onPress={choose} style={[styles.button, (disabled || busy) && styles.disabled]}>
      <Text style={styles.buttonText}>{busy ? 'Opening contacts…' : label}</Text>
    </Pressable>
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    <Modal visible={!!choice} transparent onRequestClose={finish}>
      <View style={styles.backdrop}><View accessibilityViewIsModal style={styles.card}>
        <Text style={styles.title}>Choose a phone number</Text>
        {choice?.phones.map((phone, index) => <Pressable key={index} accessibilityRole="button" style={styles.button}
          onPress={() => { onSelect({ name: choice.name, email: choice.email, phone }); finish(); }}>
          <Text style={styles.buttonText}>{phone}</Text>
        </Pressable>)}
        <Pressable accessibilityRole="button" onPress={finish} style={styles.button}><Text style={styles.buttonText}>Cancel</Text></Pressable>
      </View></View>
    </Modal>
  </View>;
}

const styles = StyleSheet.create({
  group: { gap: 8 },
  button: { borderColor: colors.primary, borderWidth: 1, borderRadius: 12, padding: 14, minHeight: 48, alignItems: 'center' },
  buttonText: { color: colors.primary, fontSize: 15, fontWeight: '600' },
  disabled: { opacity: 0.4 },
  error: { color: colors.danger, fontSize: 13, lineHeight: 19 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, gap: 12, width: '100%', maxWidth: 480, alignSelf: 'center' },
  title: { color: colors.ink, fontSize: 18, fontWeight: '600' },
});

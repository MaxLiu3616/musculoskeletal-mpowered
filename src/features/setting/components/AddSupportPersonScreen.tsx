import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/theme';
import { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { AppText as Text, AppTextInput as TextInput } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';
import type { SupportPerson } from '@/features/setting/SettingContext';
import SupportContactPicker from '@/components/SupportContactPicker';
import { getSupportPersonError, sameSupportPerson, supportAccessNote } from '../SupportPeople.data';

import { styles } from './SettingScreen.styles';

type AddSupportPersonScreenProps = {
    editingId?: string;
    onBack: () => void;
    onDone: () => void;
};

export default function AddSupportPersonScreen(
    props: AddSupportPersonScreenProps,
) {
    const { editingId, onBack, onDone } = props;
    const { supportPeople, addSupportPerson, updateSupportPerson, supportPeopleSaving, supportPeopleLoading } =
        useSetting();

    const existing = editingId
        ? supportPeople.find((person) => person.id === editingId)
        : undefined;

    const [name, setName] = useState(existing?.name ?? '');
    const [phone, setPhone] = useState(existing?.phone ?? '');
    const [email, setEmail] = useState(existing?.email ?? '');
    const [canAddQuestions, setCanAddQuestions] = useState(
        existing?.canAddQuestions ?? false,
    );
    const [canViewAnswers, setCanViewAnswers] = useState(
        existing?.canViewAnswers ?? false,
    );
    const [error, setError] = useState('');
    const [pickingContact, setPickingContact] = useState(false);
    const submitting = useRef(false);
    const focused = useRef(false);
    useFocusEffect(useCallback(() => {
        focused.current = true;
        return () => { focused.current = false; };
    }, []));

    const busy = supportPeopleSaving || pickingContact || supportPeopleLoading;

    const save = async () => {
        if (busy || submitting.current) return;
        const validationError = getSupportPersonError({ name, phone, email });
        if (validationError) {
            setError(validationError);
            return;
        }
        if (supportPeople.some((person) => person.id !== editingId && sameSupportPerson(person, { name, phone, email }))) {
            setError('This person is already saved. Edit their existing details instead.');
            return;
        }

        const person: Omit<SupportPerson, 'id'> = {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            canAddQuestions,
            canViewAnswers,
        };

        submitting.current = true;
        setError('');
        try {
            if (editingId) {
                await updateSupportPerson(editingId, person);
            } else {
                await addSupportPerson(person);
            }
            if (focused.current) onDone();
        } catch {
            setError('Could not save this support person. Your details are still here. Check your connection and try again.');
        } finally {
            submitting.current = false;
        }
    };

    return (
        <HealthScreen
            title={existing ? 'Edit Support Person' : 'Add Support Person'}
            onBack={busy ? undefined : onBack}
        >
            <Text style={styles.subtitle}>Save someone you can choose when planning an appointment.</Text>
            <SupportContactPicker label="Choose from contacts" disabled={busy} onBusyChange={setPickingContact}
                onSelect={(contact) => { setName(contact.name); setPhone(contact.phone); setEmail(contact.email); setError(''); }} />
            <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    accessibilityLabel="Support person name"
                    editable={!busy}
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={styles.input}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    accessibilityLabel="Support person phone number"
                    editable={!busy}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    style={styles.input}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Email (optional)</Text>
                <TextInput
                    accessibilityLabel="Support person email (optional)"
                    editable={!busy}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Access type</Text>

                <Pressable
                    accessibilityRole="checkbox"
                    accessibilityLabel="Add questions"
                    accessibilityState={{ checked: canAddQuestions }}
                    disabled={busy}
                    aria-checked={canAddQuestions}
                    onPress={() => setCanAddQuestions((value) => !value)}
                    style={styles.row}
                >
                    <Text style={styles.rowText}>Add questions</Text>
                    <Ionicons name={canAddQuestions ? "checkbox" : "square-outline"} size={24} color={colors.primary} />
                </Pressable>

                <Pressable
                    accessibilityRole="checkbox"
                    accessibilityLabel="View doctor's answers"
                    accessibilityState={{ checked: canViewAnswers }}
                    disabled={busy}
                    aria-checked={canViewAnswers}
                    onPress={() => setCanViewAnswers((value) => !value)}
                    style={styles.row}
                >
                    <Text style={styles.rowText}>View doctor's answers</Text>
                    <Ionicons name={canViewAnswers ? "checkbox" : "square-outline"} size={24} color={colors.primary} />
                </Pressable>
            </View>

            <Text style={styles.muted}>{supportAccessNote}</Text>
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

            <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: busy, busy: supportPeopleSaving }}
                disabled={busy}
                onPress={save}
                style={[
                    styles.actionButton,
                    { alignItems: 'center', paddingVertical: 12 },
                    busy && styles.disabled,
                ]}
            >
                <Text style={styles.cardButtonText}>{supportPeopleSaving ? 'Saving…' : 'Save'}</Text>
            </Pressable>
        </HealthScreen>
    );
}

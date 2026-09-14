import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';
import type { SupportPerson } from '@/features/setting/SettingContext';

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
    const { supportPeople, addSupportPerson, updateSupportPerson } =
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

    const canSave = name.trim().length > 0 && phone.trim().length > 0;

    const save = () => {
        if (!canSave) {
            setError('Name and phone number are required.');
            return;
        }

        const person: Omit<SupportPerson, 'id'> = {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            canAddQuestions,
            canViewAnswers,
        };

        if (existing) {
            updateSupportPerson(existing.id, person);
        } else {
            addSupportPerson(person);
        }

        setError('');
        onDone();
    };

    return (
        <HealthScreen
            title={existing ? 'Edit Support Person' : 'Add Support Person'}
            onBack={onBack}
        >
            <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={styles.input}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
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
                    accessibilityState={{ checked: canAddQuestions }}
                    onPress={() => setCanAddQuestions((value) => !value)}
                    style={styles.row}
                >
                    <Text style={styles.rowText}>Add questions</Text>
                    {canAddQuestions ? <Text style={styles.value}>✓</Text> : null}
                </Pressable>

                <Pressable
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: canViewAnswers }}
                    onPress={() => setCanViewAnswers((value) => !value)}
                    style={styles.row}
                >
                    <Text style={styles.rowText}>View doctor's answers</Text>
                    {canViewAnswers ? <Text style={styles.value}>✓</Text> : null}
                </Pressable>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text
                accessibilityRole="button"
                onPress={save}
                style={[
                    styles.cardButtonText,
                    styles.card,
                    { textAlign: 'center', paddingVertical: 12 },
                    !canSave && styles.disabled,
                ]}
            >
                Save
            </Text>
        </HealthScreen>
    );
}
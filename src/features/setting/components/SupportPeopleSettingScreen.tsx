import { Pressable, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { AppText as Text } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';
import { supportAccessNote } from '../SupportPeople.data';

import { styles } from './SettingScreen.styles';

type SupportPeopleSettingsScreenProps = {
    onBack: () => void;
    onAddPerson: () => void;
    onEditPerson: (id: string) => void;
};

export default function SupportPeopleSettingsScreen(
    props: SupportPeopleSettingsScreenProps,
) {
    const { onBack, onAddPerson, onEditPerson } = props;
    const { supportPeople, removeSupportPerson, supportPeopleLoading, supportPeopleError, supportPeopleSaving, reloadSupportPeople } = useSetting();
    const [error, setError] = useState('');
    const [removingId, setRemovingId] = useState<string | null>(null);
    useFocusEffect(useCallback(() => { void reloadSupportPeople(); }, [reloadSupportPeople]));
    const remove = async (id: string) => {
        if (supportPeopleSaving) return;
        setError('');
        setRemovingId(id);
        try {
            await removeSupportPerson(id);
        } catch {
            setError('Could not remove this person. Check your connection and try again.');
        } finally {
            setRemovingId(null);
        }
    };
    const busy = supportPeopleLoading || supportPeopleSaving;

    return (
        <HealthScreen title="Support People" onBack={onBack}>
            <Text style={styles.subtitle}>
                Save people to your account and choose up to two for each appointment.
            </Text>
            {supportPeopleLoading ? <Text accessibilityLiveRegion="polite" style={styles.muted}>Loading support people…</Text> : null}
            {supportPeopleError ? <View style={styles.field}>
                <Text accessibilityRole="alert" style={styles.error}>{supportPeopleError}</Text>
                <Pressable accessibilityRole="button" onPress={() => void reloadSupportPeople()} disabled={busy}>
                    <Text style={styles.rowText}>Try again</Text>
                </Pressable>
            </View> : null}
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

            {supportPeople.length === 0 && !supportPeopleLoading && !supportPeopleError ? (
                <View style={styles.card}>
                    <Text style={styles.muted}>
                        You have not added any support people yet.
                    </Text>
                </View>
            ) : (
                <View style={styles.card}>
                    {supportPeople.map((person) => (
                        <View key={person.id} style={styles.row}>
                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel={`Edit ${person.name}`}
                                disabled={busy}
                                onPress={() => onEditPerson(person.id)}
                                style={{ flex: 1 }}
                            >
                                <Text style={styles.rowText}>{person.name}</Text>
                                <Text style={styles.muted}>{person.phone}</Text>
                                {person.email ? <Text style={styles.muted}>{person.email}</Text> : null}
                                <Text style={styles.muted}>{[
                                    person.canAddQuestions && 'Add questions',
                                    person.canViewAnswers && 'View answers',
                                ].filter(Boolean).join(' · ') || 'No access preferences selected'}</Text>
                            </Pressable>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel={`Remove ${person.name}`}
                                accessibilityState={{ disabled: busy }}
                                disabled={busy}
                                style={{ minHeight: 44, justifyContent: 'center' }}
                                onPress={() => void remove(person.id)}
                            >
                                <Text style={styles.deleteText}>{removingId === person.id ? 'Removing…' : 'Remove'}</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}

            <Text style={styles.muted}>{supportAccessNote}</Text>
            <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: busy || !!supportPeopleError }}
                disabled={busy || !!supportPeopleError}
                onPress={onAddPerson}
                style={[
                    styles.actionButton,
                    { alignItems: 'center', paddingVertical: 12 },
                    (busy || !!supportPeopleError) && styles.disabled,
                ]}
            >
                <Text style={styles.cardButtonText}>Add a support person</Text>
            </Pressable>
        </HealthScreen>
    );
}

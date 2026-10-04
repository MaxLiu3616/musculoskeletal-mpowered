import { Pressable, View } from 'react-native';

import { AppText as Text } from '@/components/typography';

import HealthScreen from '@/features/my-health/components/HealthScreen';
import { useSetting } from '@/features/setting/SettingContext';

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
    const { supportPeople, removeSupportPerson } = useSetting();

    return (
        <HealthScreen title="Support People" onBack={onBack}>
            <Text style={styles.subtitle}>
                Manage who can help with your account and what they can access.
            </Text>

            {supportPeople.length === 0 ? (
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
                                onPress={() => onEditPerson(person.id)}
                                style={{ flex: 1 }}
                            >
                                <Text style={styles.rowText}>{person.name}</Text>
                                <Text style={styles.muted}>{person.phone}</Text>
                            </Pressable>

                            <Pressable
                                accessibilityRole="button"
                                onPress={() => removeSupportPerson(person.id)}
                            >
                                <Text style={styles.deleteText}>Remove</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}

            <Text
                accessibilityRole="button"
                onPress={onAddPerson}
                style={[
                    styles.cardButtonText,
                    styles.actionButton,
                    { textAlign: 'center', paddingVertical: 12 },
                ]}
            >
                Add a support person
            </Text>
        </HealthScreen>
    );
}

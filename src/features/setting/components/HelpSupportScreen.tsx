import { Linking, Pressable, View } from 'react-native';
import { AppText as Text } from '@/components/typography';
import HealthScreen from '@/features/my-health/components/HealthScreen';
import { styles } from './SettingScreen.styles';

type HelpSupportScreenProps = {
    onBack: () => void;
};

export default function HelpSupportScreen({
                                              onBack,
                                          }: HelpSupportScreenProps) {
    const openContactForm = () => {
        Linking.openURL('https://muscha.org/contact-us/');
    };

    const callPhone = () => {
        Linking.openURL('tel:0385318000');
    };

    const callHelpline = () => {
        Linking.openURL('tel:1800263265');
    };

    const sendEmail = () => {
        Linking.openURL('mailto:info@muscha.org');
    };

    return (
        <HealthScreen title="Help & Support" onBack={onBack}>
            <View style={styles.supportSection}>
                <Text style={styles.supportTitle}>
                    Need help or have a question?
                </Text>

                <View style={styles.assessmentCard}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={callPhone}
                        style={styles.assessmentRow}
                    >
                        <Text style={styles.assessmentRowText}>
                            Phone
                        </Text>
                        <Text style={styles.muted}>
                            03 8531 8000
                        </Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="button"
                        onPress={callHelpline}
                        style={styles.assessmentRow}
                    >
                        <Text style={styles.assessmentRowText}>
                            B.A.M. Helpline
                        </Text>
                        <Text style={styles.muted}>
                            1800 263 265
                        </Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="button"
                        onPress={sendEmail}
                        style={styles.assessmentRow}
                    >
                        <Text style={styles.assessmentRowText}>
                            Email
                        </Text>
                        <Text style={styles.muted}>
                            info@muscha.org
                        </Text>
                    </Pressable>
                </View>

                <View>
                    <Text style={styles.supportTitle}>
                        Contact us
                    </Text>

                    <Text style={styles.supportDescription}>
                        You can contact Musculoskeletal Health Australia through their online form.
                    </Text>

                    <Pressable
                        accessibilityRole="button"
                        onPress={openContactForm}
                        style={styles.contactButton}
                    >
                        <Text style={styles.contactButtonText}>
                            Contact Us Form
                        </Text>
                    </Pressable>
                </View>
            </View>
        </HealthScreen>
    );
}
import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  View,
} from 'react-native';

import {
  AppText as Text,
  AppTextInput as TextInput,
} from '@/components/typography';

import { supabase } from '@/services/supabase';
import { colors } from '@/theme';

import {
  isValidAuMobile,
  toE164,
} from '@/utils/validation';

import { useOnboarding } from '../OnboardingContext';

import {
  phoneNumberScreenCopy,
} from './LoginInformationScreen.data';

import {
  styles,
} from './LoginInformationScreen.styles';

type PhoneNumberScreenProps = {
  onContinue: () => void;
  initialError?: string | null;
};

export default function PhoneNumberScreen({
  onContinue,
  initialError = null,
}: PhoneNumberScreenProps) {
  const {
    authMode,
    setPhoneNumber,
  } = useOnboarding();

  const [
    phoneNumber,
    setLocalPhoneNumber,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    initialError,
  );

  const isValidNumber =
    isValidAuMobile(phoneNumber);

  const canContinue =
    isValidNumber &&
    !loading;

  const updatePhoneNumber = (
    value: string,
  ) => {
    setLocalPhoneNumber(value);
    setError(null);
  };

  const continueToVerification =
    async () => {
      if (!canContinue) {
        return;
      }

      Keyboard.dismiss();
      setError(null);
      setLoading(true);

      const e164Number =
        toE164(phoneNumber);

      const shouldCreateUser =
        authMode === 'signup';

      const {
        error: sendError,
      } =
        await supabase.auth.signInWithOtp({
          phone: e164Number,
          options: {
            shouldCreateUser,
          },
        });

      setLoading(false);

      if (sendError) {
        if (authMode === 'signin') {
          setError(
            'No account was found with this phone number. Please sign up first.',
          );
        } else {
          setError(
            sendError.message,
          );
        }

        return;
      }

      setPhoneNumber(e164Number);

      onContinue();
    };

  return (
    <View
      style={[
        styles.content,
        styles.phoneContent,
      ]}
    >
      <Text style={styles.title}>
        {
          phoneNumberScreenCopy.title
        }
      </Text>

      <TextInput
        accessibilityLabel={
          phoneNumberScreenCopy.inputLabel
        }
        autoComplete="tel"
        inputMode="tel"
        keyboardType="phone-pad"
        onChangeText={
          updatePhoneNumber
        }
        onSubmitEditing={
          continueToVerification
        }
        returnKeyType="done"
        selectionColor={
          colors.primary
        }
        style={
          styles.phoneInput
        }
        textContentType="telephoneNumber"
        value={phoneNumber}
      />

      <Text
        style={
          styles.phoneHelper
        }
      >
        {
          phoneNumberScreenCopy.helper
        }
      </Text>

      {phoneNumber.length > 0 &&
        !isValidNumber && (
          <Text
            style={{
              color: colors.danger,
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Enter a valid Australian
            mobile number.
          </Text>
        )}

      {error && (
        <Text
          style={{
            color: '#D64545',
            fontSize: 13,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          disabled:
            !canContinue,
        }}
        disabled={!canContinue}
        onPress={
          continueToVerification
        }
        style={({ pressed }) => [
          styles.primaryButton,
          styles.phoneButton,
          !canContinue &&
            styles.primaryButtonDisabled,
          pressed &&
            canContinue &&
            styles.primaryButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.primaryButtonText,
            !canContinue &&
              styles.primaryButtonTextDisabled,
          ]}
        >
          {loading
            ? 'Sending...'
            : phoneNumberScreenCopy.continueLabel}
        </Text>
      </Pressable>
    </View>
  );
}
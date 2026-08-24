import { useEffect, useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import {
  verificationCodeScreenCopy,
  verificationResendSeconds,
} from './LoginInformationScreen.data';
import { styles } from './LoginInformationScreen.styles';

type VerificationCodeScreenProps = {
  onVerify: () => void;
};

const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

export default function VerificationCodeScreen({
  onVerify,
}: VerificationCodeScreenProps) {
  const [code, setCode] = useState('');
  const [secondsUntilResend, setSecondsUntilResend] = useState(
    verificationResendSeconds,
  );
  const canVerify = code.length === 4;
  const canResend = secondsUntilResend === 0;

  useEffect(() => {
    if (canResend) {
      return;
    }

    const timer = setTimeout(() => {
      setSecondsUntilResend((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [canResend, secondsUntilResend]);

  const updateCode = (value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, 4));
  };

  const resendCode = () => {
    if (!canResend) {
      return;
    }

    setCode('');
    setSecondsUntilResend(verificationResendSeconds);
  };

  const verifyCode = () => {
    if (!canVerify) {
      return;
    }

    Keyboard.dismiss();
    onVerify();
  };

  return (
    <View style={[styles.content, styles.verificationContent]}>
      <Text style={styles.verificationTitle}>
        {verificationCodeScreenCopy.title}
      </Text>

      <View style={styles.codeInputArea}>
        <View style={styles.codeBoxes}>
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[
                styles.codeBox,
                index === Math.min(code.length, 3) && styles.codeBoxActive,
              ]}
            >
              <Text style={styles.codeDigit}>{code[index] ?? ''}</Text>
            </View>
          ))}
        </View>

        <TextInput
          accessibilityLabel={verificationCodeScreenCopy.inputLabel}
          autoComplete="one-time-code"
          caretHidden
          importantForAutofill="yes"
          inputMode="numeric"
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={updateCode}
          onSubmitEditing={verifyCode}
          returnKeyType="done"
          selectionColor="transparent"
          style={styles.codeInput}
          textContentType="oneTimeCode"
          value={code}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canResend }}
        disabled={!canResend}
        onPress={resendCode}
        style={({ pressed }) => [
          styles.resendButton,
          pressed && canResend && styles.resendButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.resendButtonText,
            !canResend && styles.resendButtonTextDisabled,
          ]}
        >
          {verificationCodeScreenCopy.resendLabel}
        </Text>
      </Pressable>

      <Text accessibilityLiveRegion="polite" style={styles.resendHelper}>
        {canResend
          ? verificationCodeScreenCopy.resendAvailable
          : `${verificationCodeScreenCopy.resendHelperPrefix} ${formatCountdown(
              secondsUntilResend,
            )}`}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canVerify }}
        disabled={!canVerify}
        onPress={verifyCode}
        style={({ pressed }) => [
          styles.primaryButton,
          styles.verifyButton,
          !canVerify && styles.primaryButtonDisabled,
          pressed && canVerify && styles.primaryButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.primaryButtonText,
            !canVerify && styles.primaryButtonTextDisabled,
          ]}
        >
          {verificationCodeScreenCopy.verifyLabel}
        </Text>
      </Pressable>

    </View>
  );
}

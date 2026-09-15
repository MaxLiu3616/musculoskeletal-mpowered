import { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextProps,
  type TextStyle,
} from 'react-native';

import { useSetting } from '@/features/setting/SettingContext';

const textScales = { small: 0.9, medium: 1, large: 1.25 };

function useScaledTextStyle(style: StyleProp<TextStyle>) {
  const { display } = useSetting();
  const scale = textScales[display.textSize];
  const { fontSize, lineHeight } = StyleSheet.flatten(style) ?? {};

  // Leave unspecified sizes inherited so nested emphasis is not scaled twice.
  return [style, {
    ...(fontSize !== undefined && { fontSize: fontSize * scale }),
    ...(lineHeight !== undefined && { lineHeight: lineHeight * scale }),
  }];
}

export const AppText = forwardRef<Text, TextProps>(function AppText(
  { style, ...props },
  ref,
) {
  const scaledStyle = useScaledTextStyle(style);
  return <Text {...props} ref={ref} style={scaledStyle} />;
});

export const AppTextInput = forwardRef<TextInput, TextInputProps>(function AppTextInput(
  { style, ...props },
  ref,
) {
  const scaledStyle = useScaledTextStyle(style);
  return <TextInput {...props} ref={ref} style={scaledStyle} />;
});

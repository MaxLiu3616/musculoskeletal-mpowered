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
import { fonts } from '@/theme';

const textScales = { small: 0.9, medium: 1, large: 1.25 };

function useScaledTextStyle(style: StyleProp<TextStyle>) {
  const { display } = useSetting();
  const scale = textScales[display.textSize];
  const { fontSize, lineHeight, fontFamily, fontWeight } = StyleSheet.flatten(style) ?? {};
  const strong = fontWeight === 'bold' || Number(fontWeight) >= 500;
  const family = fontFamily ?? (fontSize !== undefined || fontWeight !== undefined
    ? strong ? fonts.strong : fonts.body
    : undefined);

  // Leave unspecified sizes inherited so nested emphasis is not scaled twice.
  return [style, {
    ...(family && { fontFamily: family, fontWeight: 'normal' as const }),
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

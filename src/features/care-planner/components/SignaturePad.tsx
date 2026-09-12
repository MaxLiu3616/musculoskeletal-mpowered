import { useState } from 'react';
import { Platform, Text, View, type GestureResponderEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { styles } from './CarePlanner.styles';

export default function SignaturePad({ paths, onChange, readOnly = false }: { paths: string[]; onChange: (paths: string[]) => void; readOnly?: boolean }) {
  const [width, setWidth] = useState(320);
  const point = (event: GestureResponderEvent) => {
    const x = Math.max(0, Math.min(320, event.nativeEvent.locationX * 320 / width));
    const y = Math.max(0, Math.min(170, event.nativeEvent.locationY));
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  };
  return <View accessibilityLabel="Doctor’s signature area" accessibilityHint="Draw your signature with your finger or pointer" style={styles.signature}
    onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    onStartShouldSetResponder={() => !readOnly}
    onMoveShouldSetResponder={() => !readOnly}
    onResponderTerminationRequest={() => false}
    onResponderGrant={(event) => onChange([...paths, `M ${point(event)}`])}
    onResponderMove={(event) => { if (paths.length) onChange([...paths.slice(0, -1), `${paths[paths.length - 1]} L ${point(event)}`]); }}>
    <Svg width="100%" height={170} viewBox="0 0 320 170" style={styles.signatureDrawing}>
      {paths.map((path, index) => <Path key={index} d={path} fill="none" stroke="#38313F" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />)}
    </Svg>
    {!paths.length ? <Text style={styles.signatureHint}>{Platform.OS === 'web' ? 'Draw your signature here' : 'Sign here with your finger'}</Text> : null}
  </View>;
}

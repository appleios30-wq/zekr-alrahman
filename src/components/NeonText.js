// ============================================================================
//  NeonText - مكون النص النيون
//  قابل لإعادة الاستخدام مع تأثيرات توهج متعددة
// ============================================================================

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { getNeonTextStyle } from '../theme/designTokens';

export default function NeonText({
  children,
  color = 'cyan',
  intensity = 1,
  size = 16,
  font = 'Cairo-Regular',
  style,
  ...props
}) {
  const neonStyle = getNeonTextStyle(color, intensity);

  return (
    <Text
      style={[
        styles.base,
        {
          fontFamily: font,
          fontSize: size,
          ...neonStyle,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#FFFFFF',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

// ============================================================================
//  GlassCard - بطاقة زجاجية بتأثير Glassmorphism
// ============================================================================

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BORDER_RADIUS } from '../theme/designTokens';
import { getCurrentTheme } from '../theme/themeEngine';

export default function GlassCard({
  children,
  onPress,
  style,
  activeOpacity = 0.8,
  neonBorder = false,
  ...props
}) {
  const theme = getCurrentTheme();

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.bgCard,
          borderColor: neonBorder ? theme.colors.neonMuted : 'rgba(255,255,255,0.06)',
          shadowColor: neonBorder ? theme.colors.neonPrimary : '#000',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});

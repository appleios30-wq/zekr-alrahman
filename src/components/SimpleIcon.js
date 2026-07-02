// ============================================================================
//  SimpleIcon - أيقونات نصية بسيطة بدون vector icons
// ============================================================================

import React from 'react';
import { Text } from 'react-native';

const ICONS = {
  sparkles: '✨',
  star: '🌟',
  shield: '🛡️',
  cog: '⚙️',
  'sparkles-outline': '✨',
  'star-outline': '⭐',
  'shield-outline': '🛡️',
  'cog-outline': '⚙️',
};

export default function SimpleIcon({ name, size = 22, color = '#fff' }) {
  return (
    <Text style={{ fontSize: size, color }}>
      {ICONS[name] || '•'}
    </Text>
  );
}

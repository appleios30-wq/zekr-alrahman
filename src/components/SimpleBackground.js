// ============================================================================
//  SimpleBackground - خلفية بسيطة بدون Reanimated
//  تستخدم Dimensions بدلاً من percentage strings
// ============================================================================

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getCurrentTheme } from '../theme/themeEngine';

const { width, height } = Dimensions.get('window');

export default function SimpleBackground({ children }) {
  const theme = getCurrentTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgDeep }]}>
      <View style={[styles.overlay, { backgroundColor: theme.colors.bgOverlay }]} />
      {theme.ambientElements.glowSpots.map((spot, index) => (
        <View
          key={`glow-${index}`}
          style={[
            styles.glowSpot,
            {
              left: spot.x * width - spot.radius / 2,
              top: spot.y * height - spot.radius / 2,
              width: spot.radius,
              height: spot.radius,
              borderRadius: spot.radius / 2,
              backgroundColor: spot.color,
              opacity: spot.opacity,
            },
          ]}
        />
      ))}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  glowSpot: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});

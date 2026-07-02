// ============================================================================
//  SimpleBackground - خلفية بسيطة بدون Reanimated
//  تدرج لوني ثابت + بقع ضوئية CSS بسيطة
// ============================================================================

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getCurrentTheme } from '../theme/themeEngine';

export default function SimpleBackground({ children }) {
  const theme = getCurrentTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgDeep }]}>
      {/* Gradient Overlay */}
      <View style={[styles.overlay, { backgroundColor: theme.colors.bgOverlay }]} />

      {/* Glow Spots */}
      {theme.ambientElements.glowSpots.map((spot, index) => (
        <View
          key={`glow-${index}`}
          style={[
            styles.glowSpot,
            {
              left: `${spot.x * 100}%`,
              top: `${spot.y * 100}%`,
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
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});

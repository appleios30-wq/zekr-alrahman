// ============================================================================
//  Dynamic Background Engine - محرك الخلفيات الديناميكية
//  يستخدم Reanimated + Skia-like approach مع Animated API
// ============================================================================

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { getCurrentTheme } from '../theme/themeEngine';

const { width, height } = Dimensions.get('window');

export default function DynamicBackground({ children }) {
  const theme = getCurrentTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    Array.from({ length: theme.colors.particleCount }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(Math.random() * 0.5 + 0.2),
      scale: new Animated.Value(Math.random() * 0.8 + 0.2),
    }))
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Animate particles continuously
  useEffect(() => {
    const animations = particleAnims.map((particle, i) => {
      const duration = (4000 + Math.random() * 6000) / theme.colors.particleSpeed;

      return Animated.loop(
        Animated.sequence([
          Animated.timing(particle.y, {
            toValue: -50,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: height + 50,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    });

    animations.forEach(anim => anim.start());

    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [theme]);

  // Ambient glow spots
  const glowSpots = theme.ambientElements.glowSpots;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgDeep }]}>
      {/* Gradient Overlay */}
      <Animated.View
        style={[
          styles.gradientOverlay,
          {
            opacity: fadeAnim,
            backgroundColor: theme.colors.bgOverlay,
          },
        ]}
      />

      {/* Glow Spots */}
      {glowSpots.map((spot, index) => (
        <Animated.View
          key={`glow-${index}`}
          style={[
            styles.glowSpot,
            {
              left: spot.x * width,
              top: spot.y * height,
              width: spot.radius * 2,
              height: spot.radius * 2,
              borderRadius: spot.radius,
              backgroundColor: spot.color,
              opacity: spot.opacity,
            },
          ]}
        />
      ))}

      {/* Particles */}
      {particleAnims.map((particle, index) => (
        <Animated.View
          key={`particle-${index}`}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { scale: particle.scale },
              ],
              opacity: particle.opacity,
              backgroundColor: theme.colors.particleColor,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            },
          ]}
        />
      ))}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  glowSpot: {
    position: 'absolute',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  particle: {
    position: 'absolute',
    borderRadius: 999,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});

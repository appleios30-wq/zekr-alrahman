// ============================================================================
//  NameDetailScreen - تفاصيل اسم الله
// ============================================================================

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS } from '../theme/designTokens';
import { NAMES_OF_ALLAH } from '../data/namesOfAllah';

export default function NameDetailScreen({ route, navigation }) {
  const { nameId } = route.params;
  const theme = getCurrentTheme();
  const nameObj = NAMES_OF_ALLAH.find((n) => n.id === nameId) || NAMES_OF_ALLAH[0];

  // Pulse animation
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 2500 }),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.6, 1]),
    transform: [
      {
        scale: interpolate(pulse.value, [0, 1], [1, 1.05]),
      },
    ],
  }));

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${nameObj.name} - ${nameObj.meaning}\n${nameObj.relatedZikr}`,
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Big Name */}
        <Animated.View style={[styles.bigNameContainer, glowStyle]}>
          <NeonText
            color={nameObj.glowColor}
            size={52}
            font="ArefRuqaa"
            intensity={1.5}
            style={styles.bigName}
          >
            {nameObj.name}
          </NeonText>
        </Animated.View>

        <NeonText color="secondary" size={16} style={styles.meaning}>
          {nameObj.meaning}
        </NeonText>

        {/* Description */}
        <GlassCard style={styles.detailCard} neonBorder>
          <NeonText color={theme.colors.neonPrimary} size={14} font="Cairo-Bold" style={styles.sectionTitle}>
            معنى الاسم
          </NeonText>
          <NeonText color="secondary" size={14} font="Amiri-Regular" style={styles.description}>
            {nameObj.description}
          </NeonText>
        </GlassCard>

        {/* Related Zikr */}
        <GlassCard style={styles.detailCard}>
          <NeonText color={theme.colors.neonSecondary} size={14} font="Cairo-Bold" style={styles.sectionTitle}>
            الذكر المرتبط
          </NeonText>
          <NeonText
            color={theme.colors.neonSecondary}
            size={18}
            font="Amiri-Regular"
            intensity={1}
            style={styles.relatedZikr}
          >
            {nameObj.relatedZikr}
          </NeonText>
        </GlassCard>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, { borderColor: theme.colors.neonPrimary }]}
            onPress={handleShare}
          >
            <NeonText color={theme.colors.neonPrimary} size={14} font="Cairo-Bold">
              مشاركة
            </NeonText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { borderColor: theme.colors.neonSecondary }]}
            onPress={() => navigation.goBack()}
          >
            <NeonText color={theme.colors.neonSecondary} size={14} font="Cairo-Bold">
              رجوع
            </NeonText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: SPACING.screenPadding,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  bigNameContainer: {
    marginTop: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  bigName: {
    textAlign: 'center',
  },
  meaning: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  detailCard: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: 8,
    textAlign: 'right',
  },
  description: {
    lineHeight: 26,
    textAlign: 'right',
  },
  relatedZikr: {
    lineHeight: 28,
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: SPACING.lg,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    minWidth: 120,
    alignItems: 'center',
  },
});

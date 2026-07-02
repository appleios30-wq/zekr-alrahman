// ============================================================================
//  AdhkarScreen - شاشة الأذكار المخصصة
//  قائمة الأذكار مع عداد تفاعلي وتأثيرات نيون
// ============================================================================

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS, COLORS } from '../theme/designTokens';
import { useAppStore } from '../store/appStore';
import { getGreeting } from '../utils/timeUtils';

const { width } = Dimensions.get('window');

export default function AdhkarScreen({ navigation }) {
  const theme = getCurrentTheme();
  const { adhkar, incrementZikrCount, removeZikr } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'الكل' },
    { key: 'morning', label: 'صباح' },
    { key: 'evening', label: 'مساء' },
    { key: 'general', label: 'عام' },
  ];

  const filteredAdhkar =
    selectedCategory === 'all'
      ? adhkar
      : adhkar.filter((z) => z.category === selectedCategory);

  const handleIncrement = (zikr) => {
    if (zikr.currentCount < zikr.targetCount) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      incrementZikrCount(zikr.id);
    }
  };

  const handleDelete = (zikr) => {
    Alert.alert(
      'حذف الذكر',
      `هل تريد حذف "${zikr.title}"؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => removeZikr(zikr.id),
        },
      ]
    );
  };

  const progressColor = (progress) => {
    if (progress >= 1) return theme.colors.neonSecondary;
    return theme.colors.neonPrimary;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <NeonText
          color={theme.key === 'MORNING' ? 'cyan' : theme.key === 'EVENING' ? 'purple' : 'crimson'}
          size={14}
          style={styles.greeting}
        >
          {getGreeting()} ✨
        </NeonText>
        <NeonText
          color={theme.key === 'MORNING' ? 'green' : theme.key === 'EVENING' ? 'orange' : 'gold'}
          size={28}
          font="Cairo-Bold"
          intensity={1.2}
          style={styles.title}
        >
          أذكاري
        </NeonText>
        <NeonText color="muted" size={12} style={styles.subtitle}>
          ما بينك وبين الله
        </NeonText>
      </View>

      {/* Category Filter */}
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.filterChip,
              selectedCategory === cat.key && {
                backgroundColor: `${theme.colors.neonPrimary}25`,
                borderColor: theme.colors.neonPrimary,
              },
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <NeonText
              color={selectedCategory === cat.key ? theme.colors.neonPrimary : 'muted'}
              size={12}
            >
              {cat.label}
            </NeonText>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredAdhkar.length === 0 ? (
          <View style={styles.emptyState}>
            <NeonText color="muted" size={16} style={styles.emptyText}>
              لا توجد أذكار بعد
            </NeonText>
            <NeonText color="muted" size={12}>
              اضغط + لإضافة أول ذكر
            </NeonText>
          </View>
        ) : (
          filteredAdhkar.map((zikr) => {
            const progress = zikr.targetCount > 0 ? zikr.currentCount / zikr.targetCount : 0;
            return (
              <GlassCard
                key={zikr.id}
                onPress={() => handleIncrement(zikr)}
                onLongPress={() => handleDelete(zikr)}
                neonBorder={progress >= 1}
                style={styles.zikrCard}
              >
                <View style={styles.zikrHeader}>
                  <NeonText
                    color={theme.colors.neonPrimary}
                    size={18}
                    font="Cairo-Bold"
                    style={styles.zikrTitle}
                  >
                    {zikr.title}
                  </NeonText>
                  {zikr.isFavorite && (
                    <NeonText color="gold" size={14}>
                      ★
                    </NeonText>
                  )}
                </View>

                <NeonText
                  color="secondary"
                  size={14}
                  font="Amiri-Regular"
                  style={styles.zikrContent}
                  numberOfLines={3}
                >
                  {zikr.content}
                </NeonText>

                {/* Counter */}
                <View style={styles.counterRow}>
                  <View style={styles.progressContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${progress * 100}%`,
                          backgroundColor: progressColor(progress),
                        },
                      ]}
                    />
                  </View>
                  <NeonText
                    color={progress >= 1 ? 'green' : 'primary'}
                    size={14}
                    font="Cairo-Bold"
                  >
                    {zikr.currentCount} / {zikr.targetCount}
                  </NeonText>
                </View>

                {zikr.reference ? (
                  <NeonText color="muted" size={10} style={styles.reference}>
                    {zikr.reference}
                  </NeonText>
                ) : null}
              </GlassCard>
            );
          })
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: `${theme.colors.neonSecondary}20`,
            borderColor: theme.colors.neonSecondary,
            shadowColor: theme.colors.neonSecondary,
          },
        ]}
        onPress={() => navigation.navigate('AddZikr')}
        activeOpacity={0.8}
      >
        <NeonText color="green" size={28} font="Cairo-Bold">
          +
        </NeonText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: SPACING.screenPadding,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.6,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginBottom: 8,
  },
  zikrCard: {
    marginBottom: SPACING.md,
  },
  zikrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zikrTitle: {
    flex: 1,
    textAlign: 'right',
  },
  zikrContent: {
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  reference: {
    marginTop: 8,
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
  },
});

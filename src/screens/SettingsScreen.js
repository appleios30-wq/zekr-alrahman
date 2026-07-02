// ============================================================================
//  SettingsScreen - الإعدادات
// ============================================================================

import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme, TIME_THEMES } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS } from '../theme/designTokens';
import { useAppStore } from '../store/appStore';
import { getTimeUntilNextTheme } from '../utils/timeUtils';

export default function SettingsScreen() {
  const theme = getCurrentTheme();
  const setAuthenticated = useAppStore((state) => state.setAuthenticated);
  const timeLeft = getTimeUntilNextTheme();

  const handleExport = () => {
    // Export encrypted JSON
    alert('سيتم تصدير البيانات كملف JSON مشفر');
  };

  const handleClearAll = () => {
    // Clear all data
    alert('سيتم حذف جميع البيانات المحلية');
  };

  const handleLockSirr = () => {
    setAuthenticated(false);
    alert('تم قفل سر في بئر');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NeonText
          color={theme.colors.neonPrimary}
          size={28}
          font="Cairo-Bold"
          intensity={1.2}
        >
          الإعدادات
        </NeonText>
        <NeonText color="muted" size={12}>
          اضبط تطبيقك على هواك
        </NeonText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Theme Info */}
        <GlassCard style={styles.sectionCard} neonBorder>
          <NeonText color={theme.colors.neonPrimary} size={14} font="Cairo-Bold" style={styles.sectionTitle}>
            الثيم الحالي
          </NeonText>
          <View style={styles.themePreview}>
            <NeonText color={theme.colors.neonSecondary} size={32} font="Cairo-Bold">
              {theme.label}
            </NeonText>
            <NeonText color="secondary" size={13} style={styles.themeDesc}>
              {theme.key === 'MORNING'
                ? 'نور وإشراق بالأزرق والأخضر النيون'
                : theme.key === 'EVENING'
                ? 'دفء وسكينة بالبنفسجي والبرتقالي'
                : 'هدوء وأمان بالأحمر والذهبي'}
            </NeonText>
            <NeonText color="muted" size={11}>
              الانتقال التلقائي بعد {timeLeft.hours}س {timeLeft.minutes}د
            </NeonText>
          </View>
          <View style={styles.colorDots}>
            {theme.colors.gradientMain.map((c, i) => (
              <View key={i} style={[styles.colorDot, { backgroundColor: c }]} />
            ))}
          </View>
        </GlassCard>

        {/* Security */}
        <GlassCard style={styles.sectionCard}>
          <NeonText color={theme.colors.neonSecondary} size={14} font="Cairo-Bold" style={styles.sectionTitle}>
            الأمان
          </NeonText>
          <SettingRow
            icon="🛡️"
            label="قفل سر في بئر الآن"
            onPress={handleLockSirr}
            color={theme.colors.neonPrimary}
          />
          <SettingRow
            icon="🔑"
            label="تغيير PIN"
            onPress={() => alert('سيتم فتح شاشة تغيير PIN')}
            color={theme.colors.neonPrimary}
          />
          <SettingRow
            icon="👆"
            label="تفعيل البصمة / Face ID"
            onPress={() => alert('تفعيل المصادقة البيومترية')}
            color={theme.colors.neonPrimary}
          />
        </GlassCard>

        {/* Data */}
        <GlassCard style={styles.sectionCard}>
          <NeonText color={theme.colors.neonSecondary} size={14} font="Cairo-Bold" style={styles.sectionTitle}>
            البيانات
          </NeonText>
          <SettingRow
            icon="📤"
            label="تصدير نسخة احتياطية"
            onPress={handleExport}
            color={theme.colors.neonPrimary}
          />
          <SettingRow
            icon="📥"
            label="استيراد البيانات"
            onPress={() => alert('اختيار ملف JSON للاستيراد')}
            color={theme.colors.neonPrimary}
          />
          <SettingRow
            icon="🗑️"
            label="حذف جميع البيانات"
            onPress={handleClearAll}
            color="#FF0040"
            danger
          />
        </GlassCard>

        {/* About */}
        <GlassCard style={styles.sectionCard}>
          <NeonText color={theme.colors.neonSecondary} size={14} font="Cairo-Bold" style={styles.sectionTitle}>
            عن التطبيق
          </NeonText>
          <NeonText color="secondary" size={13} style={styles.aboutText}>
            Zekr Alrahman — تطبيق أذكار مخصصة مع أسماء الله الحسنى والمفكرة المشفرة
          </NeonText>
          <NeonText color="muted" size={11} style={styles.aboutText}>
            صُنع بحب لله. اللهم اجعله في ميزان حسناتنا.
          </NeonText>
          <NeonText color="muted" size={11} style={styles.version}>
            الإصدار 1.0.0
          </NeonText>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

function SettingRow({ icon, label, onPress, color, danger }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <NeonText size={18}>{icon}</NeonText>
      <NeonText color={danger ? 'crimson' : 'primary'} size={14} style={styles.rowLabel}>
        {label}
      </NeonText>
      <NeonText color="muted" size={16}>
        ‹
      </NeonText>
    </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 40,
  },
  sectionCard: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: 12,
    textAlign: 'right',
  },
  themePreview: {
    alignItems: 'center',
    marginBottom: 12,
  },
  themeDesc: {
    marginTop: 4,
    textAlign: 'center',
  },
  colorDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  rowLabel: {
    flex: 1,
    marginHorizontal: 12,
    textAlign: 'right',
  },
  aboutText: {
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 20,
  },
  version: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.5,
  },
});

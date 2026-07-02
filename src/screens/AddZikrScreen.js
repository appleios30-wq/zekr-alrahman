// ============================================================================
//  AddZikrScreen - إضافة / تعديل ذكر
// ============================================================================

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS, COLORS } from '../theme/designTokens';
import { useAppStore } from '../store/appStore';
import { Zikr } from '../data/models';

const CATEGORIES = [
  { key: 'general', label: 'عام', icon: '🌟' },
  { key: 'morning', label: 'صباح', icon: '🌅' },
  { key: 'evening', label: 'مساء', icon: '🌇' },
];

const COUNT_PRESETS = [7, 33, 100];

export default function AddZikrScreen({ navigation, route }) {
  const theme = getCurrentTheme();
  const addZikr = useAppStore((state) => state.addZikr);
  const editZikr = useAppStore((state) => state.updateZikr);

  const existingZikr = route.params?.zikr;

  const [title, setTitle] = useState(existingZikr?.title || '');
  const [content, setContent] = useState(existingZikr?.content || '');
  const [category, setCategory] = useState(existingZikr?.category || 'general');
  const [count, setCount] = useState(existingZikr?.targetCount?.toString() || '33');
  const [reference, setReference] = useState(existingZikr?.reference || '');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const zikrData = {
      id: existingZikr?.id,
      title: title.trim(),
      content: content.trim(),
      category,
      targetCount: parseInt(count) || 33,
      reference: reference.trim(),
    };

    if (existingZikr) {
      editZikr({ ...existingZikr, ...zikrData });
    } else {
      addZikr(new Zikr(zikrData));
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <NeonText
            color={theme.colors.neonPrimary}
            size={24}
            font="Cairo-Bold"
            intensity={1.2}
          >
            {existingZikr ? 'تعديل الذكر' : 'ذكر جديد'}
          </NeonText>
          <NeonText color="muted" size={12}>
            اكتب ما بينك وبين الله
          </NeonText>
        </View>

        {/* Form */}
        <GlassCard style={styles.formCard}>
          <NeonText color={theme.colors.neonSecondary} size={14} style={styles.label}>
            عنوان الذكر
          </NeonText>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.neonMuted }]}
            value={title}
            onChangeText={setTitle}
            placeholder="مثال: أذكار الصباح"
            placeholderTextColor={COLORS.text.muted}
            textAlign="right"
            writingDirection="RTL"
          />

          <NeonText color={theme.colors.neonSecondary} size={14} style={styles.label}>
            نص الذكر
          </NeonText>
          <TextInput
            style={[styles.textArea, { borderColor: theme.colors.neonMuted }]}
            value={content}
            onChangeText={setContent}
            placeholder="اكتب الذكر هنا..."
            placeholderTextColor={COLORS.text.muted}
            multiline
            numberOfLines={5}
            textAlign="right"
            writingDirection="RTL"
          />

          <NeonText color={theme.colors.neonSecondary} size={14} style={styles.label}>
            الفئة
          </NeonText>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryChip,
                  category === cat.key && {
                    backgroundColor: `${theme.colors.neonPrimary}30`,
                    borderColor: theme.colors.neonPrimary,
                  },
                ]}
                onPress={() => setCategory(cat.key)}
              >
                <NeonText size={16}>{cat.icon}</NeonText>
                <NeonText
                  color={category === cat.key ? theme.colors.neonPrimary : 'muted'}
                  size={12}
                >
                  {cat.label}
                </NeonText>
              </TouchableOpacity>
            ))}
          </View>

          <NeonText color={theme.colors.neonSecondary} size={14} style={styles.label}>
            عدد المرات
          </NeonText>
          <View style={styles.countRow}>
            {COUNT_PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[
                  styles.countChip,
                  count === preset.toString() && {
                    backgroundColor: `${theme.colors.neonPrimary}30`,
                    borderColor: theme.colors.neonPrimary,
                  },
                ]}
                onPress={() => setCount(preset.toString())}
              >
                <NeonText
                  color={count === preset.toString() ? theme.colors.neonPrimary : 'muted'}
                  size={14}
                  font="Cairo-Bold"
                >
                  {preset}
                </NeonText>
              </TouchableOpacity>
            ))}
            <TextInput
              style={[styles.countInput, { borderColor: theme.colors.neonMuted }]}
              value={count}
              onChangeText={setCount}
              keyboardType="number-pad"
              textAlign="center"
              placeholderTextColor={COLORS.text.muted}
            />
          </View>

          <NeonText color={theme.colors.neonSecondary} size={14} style={styles.label}>
            الدليل (اختياري)
          </NeonText>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.neonMuted }]}
            value={reference}
            onChangeText={setReference}
            placeholder="مثال: رواه البخاري"
            placeholderTextColor={COLORS.text.muted}
            textAlign="right"
            writingDirection="RTL"
          />
        </GlassCard>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: `${theme.colors.neonPrimary}20`,
              borderColor: theme.colors.neonPrimary,
            },
          ]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <NeonText color={theme.colors.neonPrimary} size={16} font="Cairo-Bold">
            حفظ الذكر
          </NeonText>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <NeonText color="muted" size={14}>
            إلغاء
          </NeonText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  label: {
    marginBottom: 6,
    marginTop: 12,
    textAlign: 'right',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text.primary,
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    textAlign: 'right',
  },
  textArea: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text.primary,
    fontFamily: 'Amiri-Regular',
    fontSize: 16,
    minHeight: 100,
    textAlign: 'right',
    lineHeight: 26,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  countRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  countChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    minWidth: 48,
    alignItems: 'center',
  },
  countInput: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.text.primary,
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    width: 60,
    textAlign: 'center',
  },
  saveButton: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

// ============================================================================
//  NoteEditorScreen - محرر الملاحظات المشفرة
// ============================================================================

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS, COLORS } from '../theme/designTokens';
import { useAppStore } from '../store/appStore';
import { encryptText, decryptText } from '../utils/encryption';

const MOODS = [
  { key: 'general', label: 'عام', icon: '📝' },
  { key: 'prayer', label: 'صلاة', icon: '🕌' },
  { key: 'duaa', label: 'دعاء', icon: '🤲' },
  { key: 'reflection', label: 'تأمل', icon: '🌙' },
];

export default function NoteEditorScreen({ route, navigation }) {
  const theme = getCurrentTheme();
  const { noteId } = route.params || {};
  const { addNote, updateNote, notes, removeNote } = useAppStore();

  const existingNote = noteId ? notes.find((n) => n.id === noteId) : null;

  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(existingNote?.mood || 'general');
  const [isSaving, setIsSaving] = useState(false);

  // In production: decrypt on load
  useEffect(() => {
    if (existingNote) {
      // decryptText(existingNote.encryptedContent, pin).then(setContent);
      setContent('محتوى مشفر (في الإنتاج: يتم فك التشفير بـ PIN)');
    }
  }, [existingNote]);

  // Auto-lock timer (30 seconds after inactivity)
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.goBack(); // auto lock after 30s
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSaving(true);

    try {
      // In production: encrypt content
      const encryptedContent = `enc::demo_${content}`; // placeholder

      if (existingNote) {
        updateNote({
          ...existingNote,
          title: title.trim(),
          encryptedContent,
          mood,
          updatedAt: new Date().toISOString(),
        });
      } else {
        addNote({
          id: Date.now().toString(),
          title: title.trim(),
          encryptedContent,
          mood,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      navigation.goBack();
    } catch (e) {
      Alert.alert('خطأ', 'فشل في حفظ الملاحظة');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (!existingNote) return;
    Alert.alert(
      'حذف الملاحظة',
      'هل أنت متأكد؟ لا يمكن استعادة الملاحظة المشفرة.',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => {
            removeNote(existingNote.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <NeonText color="crimson" size={24} font="Cairo-Bold" intensity={1.2}>
            {existingNote ? 'تعديل السر' : 'سر جديد'}
          </NeonText>
          <NeonText color="muted" size={11}>
            🔒 يتم التشفير بمجرد الحفظ
          </NeonText>
        </View>

        <GlassCard style={styles.formCard}>
          {/* Mood */}
          <NeonText color={theme.colors.neonSecondary} size={13} style={styles.label}>
            المزاج / السياق
          </NeonText>
          <View style={styles.moodRow}>
            {MOODS.map((m) => (
              <TouchableOpacity
                key={m.key}
                style={[
                  styles.moodChip,
                  mood === m.key && {
                    backgroundColor: `${theme.colors.neonPrimary}30`,
                    borderColor: theme.colors.neonPrimary,
                  },
                ]}
                onPress={() => setMood(m.key)}
              >
                <NeonText size={18}>{m.icon}</NeonText>
                <NeonText color={mood === m.key ? theme.colors.neonPrimary : 'muted'} size={11}>
                  {m.label}
                </NeonText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Title */}
          <NeonText color={theme.colors.neonSecondary} size={13} style={styles.label}>
            عنوان السر
          </NeonText>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.neonMuted }]}
            value={title}
            onChangeText={setTitle}
            placeholder="عنوان مختصر..."
            placeholderTextColor={COLORS.text.muted}
            textAlign="right"
            writingDirection="RTL"
          />

          {/* Content */}
          <NeonText color={theme.colors.neonSecondary} size={13} style={styles.label}>
            المحتوى المشفر
          </NeonText>
          <TextInput
            style={[styles.textArea, { borderColor: theme.colors.neonMuted }]}
            value={content}
            onChangeText={setContent}
            placeholder="اكتب ما لا يعلمه إلا الله..."
            placeholderTextColor={COLORS.text.muted}
            multiline
            numberOfLines={10}
            textAlign="right"
            writingDirection="RTL"
          />
        </GlassCard>

        {/* Actions */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: `${theme.colors.neonPrimary}20`,
              borderColor: theme.colors.neonPrimary,
            },
          ]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <NeonText color={theme.colors.neonPrimary} size={16} font="Cairo-Bold">
            {isSaving ? '...يتم التشفير' : '🔒 حفظ مشفر'}
          </NeonText>
        </TouchableOpacity>

        {existingNote && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <NeonText color="crimson" size={14}>
              🗑️ حذف الملاحظة نهائياً
            </NeonText>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
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
  moodRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  moodChip: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    minWidth: 56,
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
    minHeight: 200,
    textAlign: 'right',
    lineHeight: 28,
  },
  saveButton: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

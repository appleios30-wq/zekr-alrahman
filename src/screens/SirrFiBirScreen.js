// ============================================================================
//  SirrFiBirScreen - سر في بئر
//  Gate Screen with PIN/Biometric + Notes List
// ============================================================================

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS, COLORS } from '../theme/designTokens';
import { useAppStore } from '../store/appStore';

export default function SirrFiBirScreen({ navigation }) {
  const theme = getCurrentTheme();
  const { isAuthenticated, setAuthenticated, notes, setNotes } = useAppStore();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Mock notes for demo
  const demoNotes = [
    { id: '1', title: 'خاطرة بعد صلاة الفجر', mood: 'prayer', updatedAt: '2024-01-15' },
    { id: '2', title: 'دعاء في ليلة ماطرة', mood: 'duaa', updatedAt: '2024-01-10' },
  ];

  const handleAuth = async () => {
    if (pin.length >= 4) {
      // In production, validate hash
      setAuthenticated(true);
      setNotes(demoNotes);
    }
  };

  const handleBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('التنبيه', 'البصمة غير متوفرة على هذا الجهاز');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'افتح سر في بئر',
      fallbackLabel: 'استخدم PIN',
    });
    if (result.success) {
      setAuthenticated(true);
      setNotes(demoNotes);
    }
  };

  const getMoodIcon = (mood) => {
    const map = {
      prayer: '🕌',
      duaa: '🤲',
      reflection: '🌙',
      general: '📝',
    };
    return map[mood] || '📝';
  };

  // Gate Screen
  if (!isAuthenticated) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.gateContainer}>
          <NeonText color="crimson" size={18} font="Cairo-Bold" intensity={1.2} style={styles.gateTitle}>
            سر في بئر
          </NeonText>
          <NeonText color="muted" size={12} style={styles.gateSubtitle}>
            ما بينك وبين الله
          </NeonText>
          <NeonText color="muted" size={11} style={styles.gateHint}>
            أدخل PIN الخاص بك لفتح الملاحظات المشفرة
          </NeonText>

          {/* PIN Input */}
          <View style={styles.pinContainer}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.pinDot,
                  {
                    borderColor: theme.colors.neonPrimary,
                    backgroundColor: i < pin.length ? theme.colors.neonPrimary : 'transparent',
                  },
                ]}
              />
            ))}
          </View>

          <TextInput
            style={styles.hiddenInput}
            value={pin}
            onChangeText={(text) => {
              if (text.length <= 6) setPin(text);
            }}
            keyboardType="number-pad"
            secureTextEntry
            autoFocus
            onSubmitEditing={handleAuth}
          />

          {/* Unlock Button */}
          <TouchableOpacity
            style={[
              styles.unlockButton,
              {
                backgroundColor: `${theme.colors.neonPrimary}20`,
                borderColor: theme.colors.neonPrimary,
              },
            ]}
            onPress={handleAuth}
          >
            <NeonText color={theme.colors.neonPrimary} size={16} font="Cairo-Bold">
              فتح
            </NeonText>
          </TouchableOpacity>

          {/* Biometric */}
          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometric}>
            <NeonText color="muted" size={13}>
              🔓 استخدم البصمة / Face ID
            </NeonText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // Notes List
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NeonText color="crimson" size={28} font="Cairo-Bold" intensity={1.3}>
          سر في بئر
        </NeonText>
        <NeonText color="muted" size={12}>
          🔒 الملاحظات مشفرة بالكامل
        </NeonText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notes.map((note) => (
          <GlassCard
            key={note.id}
            onPress={() => navigation.navigate('NoteEditor', { noteId: note.id })}
            style={styles.noteCard}
          >
            <View style={styles.noteRow}>
              <NeonText size={20}>{getMoodIcon(note.mood)}</NeonText>
              <View style={styles.noteTextContainer}>
                <NeonText color="primary" size={16} font="Cairo-Bold" style={styles.noteTitle}>
                  {note.title}
                </NeonText>
                <NeonText color="muted" size={11}>
                  {note.updatedAt}
                </NeonText>
              </View>
              <NeonText color="muted" size={18}>🔒</NeonText>
            </View>
          </GlassCard>
        ))}

        {notes.length === 0 && (
          <View style={styles.emptyState}>
            <NeonText color="muted" size={16}>
              لا توجد ملاحظات سرية بعد
            </NeonText>
          </View>
        )}
      </ScrollView>

      {/* Add Note FAB */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: `${theme.colors.neonSecondary}20`,
            borderColor: theme.colors.neonSecondary,
          },
        ]}
        onPress={() => navigation.navigate('NoteEditor', { noteId: null })}
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
  gateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gateTitle: {
    marginBottom: 8,
  },
  gateSubtitle: {
    marginBottom: 24,
    opacity: 0.6,
  },
  gateHint: {
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.5,
  },
  pinContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  unlockButton: {
    width: '60%',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  biometricButton: {
    paddingVertical: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  noteCard: {
    marginBottom: SPACING.md,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  noteTextContainer: {
    flex: 1,
  },
  noteTitle: {
    textAlign: 'right',
    marginBottom: 2,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
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

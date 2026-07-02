// ============================================================================
//  NamesOfAllahScreen - شاشة أسماء الله الحسنى
//  شبكة ٩٩ اسم مع بحث واسم اليوم
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import NeonText from '../components/NeonText';
import GlassCard from '../components/GlassCard';
import { getCurrentTheme } from '../theme/themeEngine';
import { SPACING, BORDER_RADIUS, COLORS } from '../theme/designTokens';
import { NAMES_OF_ALLAH, getNameOfTheDay } from '../data/namesOfAllah';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;

export default function NamesOfAllahScreen({ navigation }) {
  const theme = getCurrentTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const nameOfTheDay = useMemo(() => getNameOfTheDay(), []);

  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return NAMES_OF_ALLAH;
    const q = searchQuery.trim();
    return NAMES_OF_ALLAH.filter(
      (n) => n.name.includes(q) || n.meaning.includes(q)
    );
  }, [searchQuery]);

  const handleNamePress = (nameObj) => {
    navigation.navigate('NameDetail', { nameId: nameObj.id });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <NeonText
          color={theme.colors.neonPrimary}
          size={14}
          style={styles.headerLabel}
        >
          و لله الأسماء الحسنى
        </NeonText>
        <NeonText
          color={theme.colors.neonSecondary}
          size={28}
          font="Cairo-Bold"
          intensity={1.2}
          style={styles.title}
        >
          أسماء الله الحسنى
        </NeonText>
      </View>

      {/* Name of the Day */}
      <TouchableOpacity
        style={[
          styles.featuredCard,
          {
            borderColor: theme.colors.neonSecondary,
            backgroundColor: `${theme.colors.neonSecondary}10`,
          },
        ]}
        onPress={() => handleNamePress(nameOfTheDay)}
      >
        <NeonText color="muted" size={11}>
          اسم اليوم
        </NeonText>
        <NeonText
          color={theme.colors.neonSecondary}
          size={32}
          font="ArefRuqaa"
          intensity={1.3}
        >
          {nameOfTheDay.name}
        </NeonText>
        <NeonText color="secondary" size={12}>
          {nameOfTheDay.meaning}
        </NeonText>
      </TouchableOpacity>

      {/* Search */}
      <View style={[styles.searchContainer, { borderColor: theme.colors.neonMuted }]}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="ابحث في الأسماء..."
          placeholderTextColor={COLORS.text.muted}
          textAlign="right"
          writingDirection="RTL"
        />
      </View>

      {/* Grid */}
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        <View style={styles.gridRow}>
          {filteredNames.map((nameObj) => (
            <TouchableOpacity
              key={nameObj.id}
              style={[
                styles.nameCard,
                {
                  width: CARD_WIDTH,
                  borderColor: `${nameObj.glowColor}30`,
                  backgroundColor: `${nameObj.glowColor}08`,
                },
              ]}
              onPress={() => handleNamePress(nameObj)}
              activeOpacity={0.7}
            >
              <NeonText
                color={nameObj.glowColor}
                size={18}
                font="ArefRuqaa"
                intensity={1}
                style={styles.nameText}
              >
                {nameObj.name}
              </NeonText>
              <NeonText color="muted" size={9} style={styles.meaningText} numberOfLines={2}>
                {nameObj.meaning}
              </NeonText>
            </TouchableOpacity>
          ))}
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  title: {
    marginBottom: 4,
  },
  featuredCard: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    padding: 16,
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: SPACING.md,
  },
  searchInput: {
    color: COLORS.text.primary,
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    textAlign: 'right',
  },
  grid: {
    paddingBottom: 100,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  nameCard: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    textAlign: 'center',
    marginBottom: 4,
  },
  meaningText: {
    textAlign: 'center',
    lineHeight: 14,
  },
});

// ============================================================================
//  Zekr Alrahman - Theme Engine
//  نظام الثيمات الديناميكية المبنية على الوقت
//  Morning (05:00-17:00) | Evening (17:00-21:00) | Sleep (21:00-05:00)
// ============================================================================

export const TIME_THEMES = {
  MORNING: {
    key: 'MORNING',
    label: 'الفجر',
    labelEn: 'Morning',
    hours: { start: 5, end: 17 },
    colors: {
      // Backgrounds
      bgDeep: '#0A0E1A',
      bgCard: 'rgba(10, 20, 35, 0.75)',
      bgGlass: 'rgba(255, 255, 255, 0.03)',
      bgOverlay: 'rgba(0, 212, 255, 0.04)',

      // Neon Accents
      neonPrimary: '#00D4FF',   // Cyan
      neonSecondary: '#00FF88', // Electric Green
      neonAccent: '#00FFFF',
      neonMuted: 'rgba(0, 212, 255, 0.3)',

      // Gradients
      gradientMain: ['#00D4FF', '#00FF88'],
      gradientBg: ['#0A0E1A', '#001B2E'],
      gradientGlow: ['rgba(0, 212, 255, 0.15)', 'rgba(0, 255, 136, 0.08)'],

      // Text
      textPrimary: '#FFFFFF',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      textMuted: 'rgba(255, 255, 255, 0.45)',

      // Particles
      particleColor: '#00D4FF',
      particleCount: 30,
      particleSpeed: 2,
      particleSize: [1, 3],
    },
    typography: {
      titleGlow: {
        textShadowColor: 'rgba(0, 212, 255, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
      },
      subtitleGlow: {
        textShadowColor: 'rgba(0, 255, 136, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
      },
    },
    ambientElements: {
      glowSpots: [
        { x: 0.2, y: 0.15, color: '#00D4FF', radius: 120, opacity: 0.12 },
        { x: 0.8, y: 0.3, color: '#00FF88', radius: 100, opacity: 0.08 },
        { x: 0.5, y: 0.8, color: '#00FFFF', radius: 140, opacity: 0.06 },
      ],
      animationLoop: 2000,
    },
  },

  EVENING: {
    key: 'EVENING',
    label: 'المغرب',
    labelEn: 'Evening',
    hours: { start: 17, end: 21 },
    colors: {
      bgDeep: '#0D0221',
      bgCard: 'rgba(20, 10, 35, 0.75)',
      bgGlass: 'rgba(255, 255, 255, 0.03)',
      bgOverlay: 'rgba(178, 75, 243, 0.04)',

      neonPrimary: '#B24BF3',   // Purple
      neonSecondary: '#FF6B35', // Orange
      neonAccent: '#FFD166',
      neonMuted: 'rgba(178, 75, 243, 0.3)',

      gradientMain: ['#B24BF3', '#FF6B35'],
      gradientBg: ['#0D0221', '#1A0525'],
      gradientGlow: ['rgba(178, 75, 243, 0.15)', 'rgba(255, 107, 53, 0.08)'],

      textPrimary: '#FFFFFF',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      textMuted: 'rgba(255, 255, 255, 0.45)',

      particleColor: '#B24BF3',
      particleCount: 25,
      particleSpeed: 1.5,
      particleSize: [1.5, 4],
    },
    typography: {
      titleGlow: {
        textShadowColor: 'rgba(178, 75, 243, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
      },
      subtitleGlow: {
        textShadowColor: 'rgba(255, 107, 53, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
      },
    },
    ambientElements: {
      glowSpots: [
        { x: 0.5, y: 0.5, color: '#FF6B35', radius: 180, opacity: 0.1 },
        { x: 0.1, y: 0.7, color: '#B24BF3', radius: 90, opacity: 0.08 },
        { x: 0.9, y: 0.2, color: '#FFD166', radius: 70, opacity: 0.06 },
      ],
      animationLoop: 4000,
    },
  },

  SLEEP: {
    key: 'SLEEP',
    label: 'العشاء',
    labelEn: 'Sleep',
    hours: { start: 21, end: 5 },
    colors: {
      bgDeep: '#050505',
      bgCard: 'rgba(15, 5, 10, 0.75)',
      bgGlass: 'rgba(255, 255, 255, 0.02)',
      bgOverlay: 'rgba(255, 0, 64, 0.03)',

      neonPrimary: '#FF0040',   // Crimson
      neonSecondary: '#FFD700', // Gold
      neonAccent: '#FF3366',
      neonMuted: 'rgba(255, 0, 64, 0.3)',

      gradientMain: ['#FF0040', '#FFD700'],
      gradientBg: ['#050505', '#0F0205'],
      gradientGlow: ['rgba(255, 0, 64, 0.1)', 'rgba(255, 215, 0, 0.06)'],

      textPrimary: '#FFFFFF',
      textSecondary: 'rgba(255, 255, 255, 0.65)',
      textMuted: 'rgba(255, 255, 255, 0.4)',

      particleColor: '#FFD700',
      particleCount: 20,
      particleSpeed: 0.8,
      particleSize: [0.8, 2.5],
    },
    typography: {
      titleGlow: {
        textShadowColor: 'rgba(255, 0, 64, 0.7)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
      },
      subtitleGlow: {
        textShadowColor: 'rgba(255, 215, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
      },
    },
    ambientElements: {
      glowSpots: [
        { x: 0.3, y: 0.2, color: '#FFD700', radius: 60, opacity: 0.08 },
        { x: 0.7, y: 0.6, color: '#FF0040', radius: 100, opacity: 0.06 },
        { x: 0.2, y: 0.8, color: '#FF3366', radius: 50, opacity: 0.05 },
        { x: 0.8, y: 0.3, color: '#FFD700', radius: 40, opacity: 0.07 },
      ],
      animationLoop: 6000,
    },
  },
};

/**
 * يحدد الثيم الحالي بناءً على الوقت
 * @returns {ThemeDefinition}
 */
export function getCurrentTheme() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 17) {
    return TIME_THEMES.MORNING;
  } else if (hour >= 17 && hour < 21) {
    return TIME_THEMES.EVENING;
  } else {
    return TIME_THEMES.SLEEP;
  }
}

/**
 * يعطي اسم الفترة الحالية للعرض
 */
export function getCurrentPeriodLabel() {
  const theme = getCurrentTheme();
  return theme.label;
}

/**
 * التدرج النيون المتحرك لأسماء الله
 */
export const NAMES_GRADIENT = ['#00D4FF', '#B24BF3', '#FF0040', '#00FF88'];

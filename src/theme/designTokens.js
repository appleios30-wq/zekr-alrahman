// ============================================================================
//  Design Tokens - الرموز التصميمية
//  مقياس موحد للألوان والظلال والمسافات
// ============================================================================

export const COLORS = {
  // الخلفيات الداكنة
  void: '#000000',
  abyss: '#050505',
  deepNavy: '#0A0E1A',
  deepPurple: '#0D0221',
  deepCrimson: '#0F0205',

  // الأسطح الزجاجية
  glassLight: 'rgba(255, 255, 255, 0.04)',
  glassMedium: 'rgba(255, 255, 255, 0.07)',
  glassHeavy: 'rgba(255, 255, 255, 0.12)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',

  // النيون
  neon: {
    cyan: '#00D4FF',
    green: '#00FF88',
    purple: '#B24BF3',
    orange: '#FF6B35',
    crimson: '#FF0040',
    gold: '#FFD700',
    pink: '#FF3366',
    amber: '#FFAA00',
  },

  // النيون بشفافية
  neonAlpha: {
    cyan20: 'rgba(0, 212, 255, 0.2)',
    cyan40: 'rgba(0, 212, 255, 0.4)',
    green20: 'rgba(0, 255, 136, 0.2)',
    purple20: 'rgba(178, 75, 243, 0.2)',
    crimson20: 'rgba(255, 0, 64, 0.2)',
    gold20: 'rgba(255, 215, 0, 0.2)',
  },

  // النصوص
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.45)',
    disabled: 'rgba(255, 255, 255, 0.25)',
    inverse: '#050505',
  },

  // حالات
  success: '#00FF88',
  warning: '#FFAA00',
  error: '#FF0040',
  info: '#00D4FF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  screenPadding: 20,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const SHADOWS = {
  neonCyan: {
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  neonGreen: {
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  neonPurple: {
    shadowColor: '#B24BF3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  neonCrimson: {
    shadowColor: '#FF0040',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const FONTS = {
  // الخطوط العربية
  cairo: {
    regular: 'Cairo-Regular',
    bold: 'Cairo-Bold',
  },
  amiri: {
    regular: 'Amiri-Regular',
    bold: 'Amiri-Bold',
  },
  arefRuqaa: 'ArefRuqaa',
  reemKufi: 'ReemKufi',
  almarai: 'Almarai-Regular',
  tajawal: 'Tajawal-Regular',
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 22,
  '2xl': 26,
  '3xl': 32,
  '4xl': 40,
  '5xl': 52,
  massive: 64,
};

/**
 * تأثير النيون على النصوص
 */
export function getNeonTextStyle(color, intensity = 1) {
  const colors = {
    cyan: 'rgba(0, 212, 255,',
    green: 'rgba(0, 255, 136,',
    purple: 'rgba(178, 75, 243,',
    orange: 'rgba(255, 107, 53,',
    crimson: 'rgba(255, 0, 64,',
    gold: 'rgba(255, 215, 0,',
  };

  const base = colors[color] || colors.cyan;

  return {
    color: COLORS.text.primary,
    textShadowColor: `${base} ${0.8 * intensity})`,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10 * intensity,
  };
}

/**
 * تأثير النيون على الحدود
 */
export function getNeonBorderStyle(color, width = 1) {
  const map = {
    cyan: '#00D4FF',
    green: '#00FF88',
    purple: '#B24BF3',
    orange: '#FF6B35',
    crimson: '#FF0040',
    gold: '#FFD700',
  };

  const c = map[color] || map.cyan;

  return {
    borderWidth: width,
    borderColor: `${c}40`,
    shadowColor: c,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  };
}

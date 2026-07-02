// ============================================================================
//  Time Utilities - أدوات الوقت
// ============================================================================

/**
 * يحدد الفترة الزمنية الحالية
 */
export function getTimePeriod() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 17) return 'morning';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'sleep';
}

/**
 * يعطي تحية مناسبة للوقت
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'صباح الخير';
  if (hour >= 12 && hour < 17) return 'مساء النور';
  if (hour >= 17 && hour < 21) return 'مساء الطمأنينة';
  return 'ليلة سعيدة';
}

/**
 * يعطي ذكراً عشوائياً عند فتح التطبيق
 */
export function getRandomOpeningDhikr() {
  const adhkar = [
    { text: 'يا حي يا قيوم', glow: 'cyan' },
    { text: 'أستغفر الله', glow: 'green' },
    { text: 'لا إله إلا أنت سبحانك إني كنت من الظالمين', glow: 'purple' },
    { text: 'اللهم صل وسلم على نبينا محمد', glow: 'gold' },
    { text: 'سبحان الله وبحمده', glow: 'cyan' },
    { text: 'لا حول ولا قوة إلا بالله', glow: 'crimson' },
    { text: 'الحمد لله رب العالمين', glow: 'green' },
    { text: 'اللهم بك أصبحنا وبك أمسينا', glow: 'purple' },
  ];
  return adhkar[Math.floor(Math.random() * adhkar.length)];
}

/**
 * صيغة التاريخ العربية
 */
export function formatArabicDate(date = new Date()) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return date.toLocaleDateString('ar-SA', options);
}

/**
 * يحسب الوقت المتبقي للانتقال للثيم التالي
 */
export function getTimeUntilNextTheme() {
  const now = new Date();
  const hour = now.getHours();
  let nextHour;

  if (hour >= 5 && hour < 17) {
    nextHour = 17;
  } else if (hour >= 17 && hour < 21) {
    nextHour = 21;
  } else {
    nextHour = 5;
  }

  const nextDate = new Date(now);
  nextDate.setHours(nextHour, 0, 0, 0);

  if (nextDate <= now) {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  const diffMs = nextDate - now;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { hours: diffHrs, minutes: diffMins };
}

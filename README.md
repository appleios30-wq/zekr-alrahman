# 🌙 Zekr Alrahman — التصميم الشامل والمواصفات التقنية

**بسم الله الرحمن الرحيم**

---

## ⚡ التشغيل السريع (Quick Start)

```bash
# ١. انتقل لمجلد المشروع
cd zekr-alrahman

# ٢. ثبّت التبعيات (تجاوز تعارضات النُسخ)
npm install --legacy-peer-deps --ignore-scripts

# ٣. شغّل على الويب (أسرع طريقة للمعاينة)
npx expo start --web

# أو شغّل على Android (يحتاج Android Studio / جهاز متصل)
npx expo start --android

# أو شغّل على iOS (يحتاج macOS + Xcode)
npx expo start --ios
```

**ملاحظة:** الخطوط العربية غير متضمنة في الريبو. حمّلها من Google Fonts (`Cairo`, `Amiri`, `ArefRuqaa`, `ReemKufi`, `Almarai`, `Tajawal`) وضعها في `assets/fonts/` قبل البناء.

---

## ١. نظرة عامة

**Zekr Alrahman** هو تطبيق أذكار مخصصة يتيح للمستخدم إضافة وإدارة أذكاره الخاصة، مع قسم لأسماء الله الحسنى (٩٩ اسم) ومفكرة مشفرة خاصة باسم **"سر في بئر"**.

### الفلسفة التصميمية
- **الخصوصية أولاً**: كل البيانات محلية، مشفرة.
- **الروحانية بالتقنية**: خلفيات نيون تتغير مع الوقت.
- **السهولة**: تجربة مستخدم مستوحاة من "حصن المسلم".

---

## ٢. الميزات الرئيسية

| الميزة | الوصف |
|--------|-------|
| **أذكاري** | نظام إضافة وتعديل وحذف الأذكار المخصصة مع عداد تفاعلي |
| **أسماء الله** | الشبكة التفاعلية لـ ٩٩ اسم مع الذكر المرتبط |
| **سر في بئر** | مفكرة مشفرة بـ AES-256 + PIN/Biometric |
| **الثيمات الديناميكية** | ثلاث خلفيات تتغير تلقائياً حسب الوقت |
| **النيون المصري** | حروف عربية مصرية تقليدية بألوان نيون مضيئة |

---

## ٣. هيكل المشروع

```
zejkr-alrahman/
├── App.js                          # نقطة الدخول + Navigation
├── package.json                    # التبعيات
├── app.json                        # إعدادات Expo
├── assets/
│   ├── fonts/                      # الخطوط العربية
│   │   ├── Cairo-Bold.ttf
│   │   ├── Cairo-Regular.ttf
│   │   ├── Amiri-Regular.ttf
│   │   ├── Amiri-Bold.ttf
│   │   ├── ArefRuqaa-Regular.ttf
│   │   ├── ReemKufi-Regular.ttf
│   │   ├── Almarai-Regular.ttf
│   │   └── Tajawal-Regular.ttf
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── src/
│   ├── theme/
│   │   ├── themeEngine.js          # محرك الثيمات الزمنية (Morning/Evening/Sleep)
│   │   └── designTokens.js         # الألوان، المسافات، الظلال، الطباعة
│   ├── components/
│   │   ├── DynamicBackground.js    # الخلفيات المتحركة + الجسيمات + البقع المتوهجة
│   │   ├── NeonText.js           # نص نيون قابل لإعادة الاستخدام
│   │   └── GlassCard.js          # بطاقة زجاجية بتأثير Glassmorphism
│   ├── screens/
│   │   ├── AdhkarScreen.js       # قائمة الأذكار + فلترة + عداد
│   │   ├── AddZikrScreen.js      # إضافة/تعديل ذكر
│   │   ├── NamesOfAllahScreen.js # شبكة ٩٩ اسم + اسم اليوم + بحث
│   │   ├── NameDetailScreen.js   # تفاصيل الاسم + Pulse Animation + مشاركة
│   │   ├── SirrFiBirScreen.js    # بوابة PIN/Biometric + قائمة الملاحظات
│   │   ├── NoteEditorScreen.js   # محرر مشفر + Auto-lock
│   │   └── SettingsScreen.js     # الإعدادات + تصدير/استيراد + معلومات
│   ├── store/
│   │   └── appStore.js           # Zustand Store (الحالة العالمية)
│   ├── data/
│   │   ├── models.js             # Zikr, SecretNote, NameOfAllah classes
│   │   └── namesOfAllah.js       # قاعدة بيانات ٩٩ اسم مع الألوان النيون
│   ├── database/
│   │   └── schema.js             # مخطط SQLite + الاستعلامات
│   └── utils/
│       ├── encryption.js         # AES-256 + PBKDF2 (Sirr fi Bir)
│       └── timeUtils.js          # أدوات الوقت + التحيات + الأذكار العشوائية
```

---

## ٤. الـ Stack التقني

| الطبقة | التقنية |
|--------|---------|
| **Framework** | React Native (Expo SDK 51) |
| **Navigation** | React Navigation v6 (Stack + Bottom Tabs) |
| **State** | Zustand + MMKV |
| **Database** | SQLite (Expo SQLite) |
| **Animations** | React Native Reanimated 3 |
| **Security** | Expo SecureStore + expo-local-authentication |
| **Haptics** | expo-haptics |
| **Fonts** | Cairo, Amiri, Aref Ruqaa, Reem Kufi, Almarai, Tajawal |

---

## ٥. نظام الثيمات الديناميكية

### المنطق الزمني

```javascript
const getTheme = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 17)  return "MORNING";  // الفجر - العصر
  if (hour >= 17 && hour < 21) return "EVENING"; // المغرب - العشاء
  return "SLEEP";                                 // العشاء - الفجر
};
```

### الثيمات الثلاث

#### 🌅 Morning (05:00 - 17:00)
- **الخلفية**: Dark Navy `#0A0E1A`
- **النيون**: Cyan `#00D4FF` + Green `#00FF88`
- **الشعور**: النور والإشراق والطاقة
- **الجسيمات**: ٣٠ جسيم سريع، أزرق/أخضر
- **البقع**: ٣ بقع نيون في الأعلى

#### 🌇 Evening (17:00 - 21:00)
- **الخلفية**: Deep Purple `#0D0221`
- **النيون**: Purple `#B24BF3` + Orange `#FF6B35`
- **الشعور**: الدفء والسكينة والأمل
- **الجسيمات**: ٢٥ جسيم متوسط، بنفسجي/برتقالي
- **البقع**: شريط أفقي في المنتصف

#### 🌙 Sleep (21:00 - 05:00)
- **الخلفية**: Void Black `#050505`
- **النيون**: Crimson `#FF0040` + Gold `#FFD700`
- **الشعور**: الهدوء والأمان والتأمل
- **الجسيمات**: ٢٠ جسيم بطيء، ذهبي/أحمر
- **البقع**: نجوم متناثرة

---

## ٦. نظام التشفير (Sirr fi Bir)

### الخوارزمية
- **التشفير**: AES-256-CBC
- **اشتقاق المفتاح**: PBKDF2 (100,000 تكرار)
- **التخزين**: SQLite مشفر + Expo SecureStore للـ PIN hash
- **الدخول**: PIN رقمي (4-6 أرقام) أو Biometric
- **Auto-lock**: قفل تلقائي بعد ٣٠ ثانية من الخروج

### Flow
```
User opens "Sirr fi Bir"
    ↓
Gate Screen (PIN or Biometric)
    ↓
Decrypt notes list (titles only)
    ↓
User opens note → Decrypt content on-demand
    ↓
Edit → Encrypt on save
```

---

## ٧. أسماء الله الحسنى (٩٩ اسم)

كل اسم يتضمن:
- **الاسم**: بالخط الديواني (Aref Ruqaa)
- **المعنى**: مختصر
- **الشرح**: تفصيلي
- **الذكر المرتبط**: للاستخدام اليومي
- **لون النيون المخصص**: يختلف حسب صفة الاسم

### اسم اليوم
يُحسب بناءً على يوم السنة:
```javascript
const dayOfYear = ...;
const index = (dayOfYear - 1) % 99;
return NAMES_OF_ALLAH[index];
```

---

## ٨. UX Flow المفصل

```
[Launch Screen]
    ↓
[Detect Time → Load Theme]
    ↓
[Main Tabs]
    ├── أذكاري
    │   ├── List (Glass Cards + Counter)
    │   ├── Add/Edit (Form)
    │   └── Tap to count / Long-press to delete
    │
    ├── أسماء الله
    │   ├── Grid 3x3 (99 cards)
    │   ├── Search bar
    │   ├── Name of the Day
    │   └── Detail with Pulse animation
    │
    ├── سر في بئر
    │   ├── Gate (PIN / Biometric)
    │   ├── Encrypted notes list
    │   └── Editor (Auto-lock)
    │
    └── إعدادات
        ├── Theme preview
        ├── Security controls
        ├── Export/Import
        └── About
```

---

## ٩. الاعتبارات الأمنية

| الميزة | التطبيق |
|--------|---------|
| **Sirr fi Bir** | AES-256 تشفير المحتوى، Biometric lock |
| **Local Data** | SQLite مشفر، لا اتصال بالسحابة |
| **Backup** | Export JSON encrypted (اختياري) |
| **Screenshots** | `FLAG_SECURE` على Android |
| **No Analytics** | لا تتبع، لا إعلانات |

---

## ١٠. خارطة الطريق

| المرحلة | المدة | المحتوى |
|---------|-------|---------|
| **MVP** | ٤ أسابيع | الأذكار + الأمان الأساسي + الثيمات |
| **v1.1** | ٢ أسبوع | أسماء الله الـ ٩٩ |
| **v1.2** | ٢ أسبوع | Sirr fi Bir بالتشفير الكامل |
| **v1.3** | ١ أسبوع | Export/Import + Widgets |
| **v2.0** | ٤ أسابيع | Reminders، Voice Counter، iPad support |

---

## ١١. اللمسات الإيمانية

- **Haptic Feedback** عند كل تسبيحة (Light impact)
- **صوت خفيف** عند إكمال العداد (Water Drop sound)
- **ذكر عشوائي** عند فتح التطبيق:
  - *"يا حي يا قيوم"*
  - *"أستغفر الله"*
  - *"سبحان الله وبحمده"*
- ** incense animation** (دخان خفيف) في Sleep Mode

---

## ١٢. التشغيل

### متطلبات
- Node.js 18+
- Expo CLI
- Android Studio / Xcode (للـ Emulators)

### التثبيت

```bash
# 1. Clone
# 2. Install
npm install

# 3. Fonts
# انسخ ملفات الخطوط إلى assets/fonts/
# (Cairo, Amiri, ArefRuqaa, ReemKufi, Almarai, Tajawal)

# 4. Run
npx expo start
```

### البناء للإنتاج

```bash
# Android
npx expo run:android --variant release

# iOS
npx expo run:ios --configuration Release
```

---

## ١٣. الدعاء

**اللهم اجعل هذا العمل خالصًا لوجهك الكريم، واجعله في ميزان حسناتنا، وانفع به المسلمين everywhere.**

**سبحانك لا علم لنا إلا ما علمتنا، إنك أنت العليم الحكيم.**

---

**الإصدار**: 1.0.0  
**التاريخ**: 2024  
**الترخيص**: MIT (صدقة جارية)

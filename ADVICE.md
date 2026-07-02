# 📚 Zekr Alrahman — دليل النصائح والإرشادات

**بسم الله الرحمن الرحيم**

> هذا الملف يجمع كل الأوامر والأخطاء والحلول التي واجهناها أثناء بناء تطبيق **Zekr Alrahman**.

---

## 🌙 نبذة عن التطبيق

**Zekr Alrahman** هو تطبيق أذكار مخصصة يتيح للمستخدم:
- إضافة وإدارة أذكاره الخاصة
- قسم **أسماء الله الحسنى** (٩٩ اسم)
- مفكرة مشفرة خاصة باسم **"سر في بئر"**
- تصميم dark mode مع نيون وخلفيات متحركة

---

## 🛠️ المتطلبات الأساسية

| الأداة | الإصدار المقترح |
|--------|----------------|
| Node.js | 18+ أو 20+ |
| npm | 9+ |
| Expo CLI | مدمج مع `npx expo` |
| Android Studio | إذا كنت تبني APK |
| JDK | 17 أو 21 |

---

## ⚠️ الأخطاء التي واجهناها والحلول

### الخطأ ١: تعارضات الإصدارات (Peer Dependencies)

**العرض:**
```
npm error ERESOLVE unable to resolve dependency tree
```

**الحل:**
```bash
npm install --legacy-peer-deps --ignore-scripts
```

**السبب:** بعض مكتبات React Native تطلب إصدارات مختلفة من React Native، و `--legacy-peer-deps` يتجاوز هذا التحقق.

---

### الخطأ ٢: `react-native-screens` build script fails

**العرض:**
```
command failed: bob build && husky install
sh: 1: bob: not found
```

**الحل:**
```bash
npm install --legacy-peer-deps --ignore-scripts
```

**السبب:** build scripts في بعض المكتبات تحتاج أدوات غير مثبتة. `--ignore-scripts` يتجاوزها.

---

### الخطأ ٣: مسار المجلد فيه حروف عربية

**العرض:**
```
exception: error: source file or directory not found: /home/ocuments/u0627u0644u0645u0633u062A.../node_modules/...
```

**الحل:**
```bash
# انقل المشروع لمسار ASCII (بدون حروف عربية)
cp -r /home/ocuments/المستندات/ZKR-ALR7MAN/zekr-alrahman /tmp/zekr-alrahman-build
cd /tmp/zekr-alrahman-build
```

**السبب:** Gradle و Kotlin compiler لا يتعاملان بشكل صحيح مع المسارات التي تحتوي على حروف غير ASCII.

---

### الخطأ ٤: ملفات الصور placeholder فارغة

**العرض:**
```
Error: Could not find MIME for Buffer <null>
```

**الحل:**
```bash
# أنشئ PNG صالح (مثلاً 48x48 بكسل)
python3 -c "
import struct, zlib
for name, size in [('icon.png',48),('splash.png',64),('adaptive-icon.png',48),('favicon.png',16)]:
    raw = b''
    for y in range(size):
        raw += b'\\x00' + b'\\x00\\x00\\x00\\x00' * size
    comp = zlib.compress(raw)
    def chunk(t, d):
        c = struct.pack('>I', len(d)) + t + d
        return c + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    ihdr = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)
    png = b'\\x89PNG\\r\\n\\x1a\\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', comp) + chunk(b'IEND', b'')
    open(f'assets/{name}', 'wb').write(png)
"
```

**السبب:** ملفات PNG الفارغة لا تُقرأ من Jimp أثناء `expo prebuild`.

---

### الخطأ ٥: `react-native-worklets` غير متطابق

**العرض:**
```
react-native-worklets@0.10.1 - expected version: 0.5.1
Error: Cannot find module 'react-native-worklets/plugin'
```

**الحل:**
```bash
npm install react-native-worklets@~0.5.1 --legacy-peer-deps --ignore-scripts
```

**السبب:** `react-native-reanimated` v4 يعتمد على `react-native-worklets` بإصدار محدد.

---

### الخطأ ٦: Expo Go incompatible version

**العرض:**
```
Project is incompatible with this version of Expo Go
Expo Go SDK 54, Project SDK 51
```

**الحل:**
```bash
# رفع المشروع لـ Expo SDK 54
# عدّل package.json:
# expo: ~54.0.0
# react-native: 0.81.5
# react: 19.1.0
# ثم:
npm install --legacy-peer-deps --ignore-scripts
```

**البديل:** لا تستخدم Expo Go، افتح الرابط من المتصفح مباشرة.

---

## 🚀 الخطوات الأساسية للتشغيل

### ١. تثبيت التبعيات

```bash
cd zekr-alrahman
npm install --legacy-peer-deps --ignore-scripts
```

### ٢. تشغيل على المتصفح

```bash
npx expo start --web
# افتح http://localhost:8081
```

### ٣. تشغيل مع Tunnel (للموبايل)

```bash
npx expo start --tunnel
# امسح QR Code بـ Expo Go
# أو افتح exp:// الرابط
```

---

## 🌐 النشر على GitHub Pages

### ١. تصدير التطبيق

```bash
npx expo export --platform web
```

### ٢. اختبار محلي

```bash
cd dist
python3 -m http.server 8082
# افتح http://localhost:8082
```

### ٣. رفع على GitHub

```bash
# داخل مجلد dist
git init
git add .
git commit -m "Deploy Zekr Alrahman"
git branch -M gh-pages
git remote add origin https://github.com/appleios30-wq/zekr-alrahman.git
git push -u origin gh-pages --force
```

### ٤. تفعيل GitHub Pages

1. https://github.com/appleios30-wq/zekr-alrahman/settings/pages
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `(root)`
4. Save

### الرابط النهائي

```
https://appleios30-wq.github.io/zekr-alrahman/
```

---

## 📱 بناء APK محلياً

### ١. توليد ملفات Android

```bash
cd zekr-alrahman
npx expo prebuild --platform android
```

### ٢. بناء APK Debug

```bash
cd android
./gradlew assembleDebug
```

### ٣. مكان APK

```
android/app/build/outputs/apk/debug/app-debug.apk
```

### ٤. بناء APK Release (مع توقيع)

```bash
# أنشئ keystore
keytool -genkey -v -keystore android/app/zekr.keystore -alias zekr -keyalg RSA -validity 10000

# ضع بيانات التوقيع في android/gradle.properties
# MYAPP_RELEASE_STORE_FILE=zekr.keystore
# MYAPP_RELEASE_KEY_ALIAS=zekr
# MYAPP_RELEASE_STORE_PASSWORD=yourpassword
# MYAPP_RELEASE_KEY_PASSWORD=yourpassword

./gradlew assembleRelease
```

---

## 📦 الإصدارات الصحيحة (package.json)

```json
{
  "dependencies": {
    "expo": "~54.0.0",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-web": "^0.21.0",
    "react-native-reanimated": "~4.1.1",
    "react-native-worklets": "~0.5.1",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/stack": "^7.0.0",
    "@expo/metro-runtime": "~6.1.2",
    "expo-crypto": "~15.0.9",
    "expo-font": "~14.0.0",
    "expo-haptics": "~15.0.8",
    "expo-local-authentication": "~17.0.8",
    "expo-notifications": "~0.32.17",
    "expo-secure-store": "~15.0.8",
    "expo-sqlite": "~16.0.0",
    "expo-status-bar": "~3.0.9",
    "@expo/vector-icons": "^10.0.0",
    "zustand": "^4.5.0",
    "crypto-js": "^4.2.0",
    "uuid": "^9.0.0"
  }
}
```

---

## 🧪 Troubleshooting

| المشكلة | الحل |
|---------|------|
| `npm install` يعلق | `npm install --legacy-peer-deps --ignore-scripts` |
| `expo start` لا يعمل | `npx expo start -c` (مسح cache) |
| لا يمكن الوصول للـ tunnel | تأكد من أن `@expo/ngrok` مثبت: `npm install -g @expo/ngrok@^4.1.0` |
| خطأ في fonts | تأكد من أن ملفات الخطوط في `assets/fonts/` |
| خطأ في images | أنشئ PNG صالح (لا يكون صفر بايت) |
| APK build fails | انقل المشروع لمسار ASCII |
| Expo Go incompatible | افتح من المتصفح أو رفع إصدار SDK |

---

## 🔒 أمان التوكن

بعد الانتهاء من النشر على GitHub:

1. https://github.com/settings/tokens
2. ابحث عن التوكن المستخدم
3. اضغط **Delete this token**

---

## 📁 هيكل المشروع

```
zekr-alrahman/
├── App.js                     # نقطة الدخول
├── package.json               # التبعيات
├── app.json                   # إعدادات Expo
├── babel.config.js            # إعداد Babel
├── eas.json                   # إعداد EAS Build
├── assets/
│   ├── fonts/                 # الخطوط العربية
│   ├── icon.png               # أيقونة التطبيق
│   ├── splash.png             # شاشة البداية
│   └── favicon.png
├── src/
│   ├── theme/                 # الثيمات والألوان
│   ├── components/            # المكونات المشتركة
│   ├── screens/               # الشاشات
│   ├── store/                 # Zustand store
│   ├── data/                  # الأذكار وأسماء الله
│   ├── database/              # SQLite schema
│   └── utils/                 # أدوات مساعدة
├── android/                   # يُنشأ بعد prebuild
└── dist/                      # يُنشأ بعد expo export
```

---

## 🎯 الخطوات المقترحة بعد التوكل

### المرحلة ١: التبسيط (أعلى نجاح)

إذا واجهت مشاكل مستمرة، جرّب النسخة المبسّطة:
- استخدم `App.simple.js` بدلاً من `App.js`
- أزل `react-native-reanimated` والخلفيات المتحركة
- استخدم تصميم بسيط dark mode
- ركّز على: الأذكار + أسماء الله + سر في بئر

### المرحلة ٢: التدريج

بعد ما النسخة البسيطة تشتغل:
- أضف الخلفيات المتحركة
- أضف التأثيرات النيون
- أضف الميزات المتقدمة

---

## 🤲 الدعاء

**اللهم اجعل هذا العمل خالصاً لوجهك الكريم، واجعله في ميزان حسناتنا، وانفع به المسلمين everywhere.**

**سبحانك لا علم لنا إلا ما علمتنا، إنك أنت العليم الحكيم.**

---

**آخر تحديث:** ٢ يوليو ٢٠٢٦


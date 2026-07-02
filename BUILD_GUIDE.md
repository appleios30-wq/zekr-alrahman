# 🚀 بناء APK / AAB — تعليمات البناء

## الطريقة ١: بناء APK محلى (باستخدام Android SDK)

### المتطلبات
- Android Studio أو Android SDK Command Line Tools
- JDK 17
- Gradle Wrapper

### الخطوات

```bash
# 1. انتقل لمجلد المشروع
cd zekr-alrahman

# 2. ثبّت التبعيات
npm install --legacy-peer-deps --ignore-scripts

# 3. أنشئ ملفات Android Native (Prebuild)
npx expo prebuild --platform android

# 4. ادخل لمجلد Android
cd android

# 5. بناء APK Debug (بدون توقيع — للاختبار)
./gradlew assembleDebug

# 6. بناء APK Release (يحتاج Keystore)
# أولاً: أنشئ Keystore
keytool -genkey -v -keystore zekr-alrahman.keystore -alias zekr -keyalg RSA -keysize 2048 -validity 10000

# ثم: ضع بيانات التوقيع فى android/gradle.properties
# MYAPP_UPLOAD_STORE_FILE=zekr-alrahman.keystore
# MYAPP_UPLOAD_KEY_ALIAS=zekr
# MYAPP_UPLOAD_STORE_PASSWORD=*****
# MYAPP_UPLOAD_KEY_PASSWORD=*****

# بعدها: بناء Release APK
./gradlew assembleRelease
```

### مكان ملف APK بعد البناء
```
android/app/build/outputs/apk/debug/app-debug.apk
android/app/build/outputs/apk/release/app-release.apk
```

---

## الطريقة ٢: بناء APK عبر Expo EAS (السحابة — لا يحتاج Android SDK)

### المتطلبات
- حساب Expo (مجاني على expo.dev)
- تثبيت EAS CLI

### الخطوات

```bash
# 1. ثبّت EAS CLI
npm install -g eas-cli

# 2. سجّل الدخول
eas login

# 3. اضبط المشروع (مرة واحدة)
eas build:configure

# 4. بناء APK Preview
 eas build -p android --profile preview

# 5. بناء AAB Production (للـ Play Store)
eas build -p android --profile production
```

EAS هيبنى التطبيق فى السحابة ويديك لينك تحمل APK مباشرة!

---

## ⚡ الطريقة السريعة (اختبار فوري)

```bash
# بدون بناء — شغّله على Android المتصل
npx expo run:android

# أو على Emulator
npx expo run:android --variant release
```

---

## 📝 ملاحظات مهمة

| العنصر | التوصية |
|--------|---------|
| **Target SDK** | API 34 (Android 14) |
| **Min SDK** | API 21 (Android 5.0) |
| **JDK** | 17 أو 21 |
| **Gradle** | 8.x |
| **NDK** | اختياري (ليس مطلوباً لهذا المشروع) |

---

## 🔐 التوقيع (Release Signing)

لرفع APK على Play Store أو مشاركته خارجياً، يجب توقيعه:

```bash
# أنشئ Keystore (مرة واحدة فقط)
keytool -genkey -v \
  -keystore zekr-alrahman.keystore \
  -alias zekr-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

أضفه لـ `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("zekr-alrahman.keystore")
            storePassword "YOUR_PASSWORD"
            keyAlias "zekr-key"
            keyPassword "YOUR_PASSWORD"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

---

**بالتوفيق! اللهم اجعله في ميزان حسناتنا 🤲**

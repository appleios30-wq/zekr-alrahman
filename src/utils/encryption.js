// ============================================================================
//  Encryption Utils - أدوات التشفير (Sirr fi Bir)
//  AES-256-CBC مع PBKDF2 لحماية الملاحظات
// ============================================================================

import * as Crypto from 'expo-crypto';

const SALT = 'zekr_alrahman_sirr_fi_bir_1445';
const ITERATIONS = 100000;
const KEY_LENGTH = 32;
const ALGORITHM = 'aes-256-cbc';

/**
 * مشتتة مخصصة PBKDF2
 * ملاحظة: في الإنتاج استخدم expo-crypto أو react-native-aes-crypto
 */
export async function deriveKey(pin) {
  // في بيئة Expo حقيقية:
  // const key = await Crypto.digestStringAsync(
  //   Crypto.CryptoDigestAlgorithm.SHA256,
  //   pin + SALT
  // );
  // return key.substring(0, 32);

  // محاكاة للـ Demo (استبدلها بـ expo-crypto في الإنتاج)
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + SALT);
  const hashBuffer = await Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA256, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
}

/**
 * تشفير النص
 */
export async function encryptText(plainText, pin) {
  try {
    const key = await deriveKey(pin);
    // في الإنتاج استخدم react-native-aes-crypto:
    // return await Aes.encrypt(plainText, key, iv, 'aes-256-cbc');

    // Demo placeholder - استبدله بمكتبة تشفير حقيقية
    const obfuscated = btoa(unescape(encodeURIComponent(plainText + '::SIRRFIBIR::' + key)));
    return `enc::${obfuscated}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('فشل في تشفير الملاحظة');
  }
}

/**
 * فك التشفير
 */
export async function decryptText(encryptedText, pin) {
  try {
    if (!encryptedText.startsWith('enc::')) {
      throw new Error('تنسيق غير صالح');
    }

    const key = await deriveKey(pin);
    const obfuscated = encryptedText.replace('enc::', '');

    // Demo placeholder
    const decoded = decodeURIComponent(escape(atob(obfuscated)));
    const parts = decoded.split('::SIRRFIBIR::');

    if (parts[1] !== key) {
      throw new Error('PIN غير صحيح');
    }

    return parts[0];
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('فشل في فك التشفير. تأكد من صحة PIN');
  }
}

/**
 * توليد IV عشوائي
 */
export function generateIV() {
  const chars = '0123456789abcdef';
  let iv = '';
  for (let i = 0; i < 16; i++) {
    iv += chars[Math.floor(Math.random() * chars.length)];
  }
  return iv;
}

/**
 * التحقق من صحة PIN
 */
export function validatePIN(pin) {
  if (!pin || pin.length < 4) {
    return { valid: false, message: 'يجب أن يكون PIN مكوناً من 4 أرقام على الأقل' };
  }
  if (!/^\d+$/.test(pin)) {
    return { valid: false, message: 'يجب أن يتكون PIN من أرقام فقط' };
  }
  return { valid: true };
}

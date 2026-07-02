// ============================================================================
//  Data Models - نماذج البيانات
// ============================================================================

export class Zikr {
  constructor(data = {}) {
    this.id = data.id || generateUUID();
    this.title = data.title || '';
    this.content = data.content || '';
    this.category = data.category || 'general'; // morning | evening | general
    this.targetCount = data.targetCount || 33;
    this.currentCount = data.currentCount || 0;
    this.reference = data.reference || '';
    this.isFavorite = data.isFavorite || false;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  get progress() {
    return this.targetCount > 0 ? this.currentCount / this.targetCount : 0;
  }

  get isComplete() {
    return this.currentCount >= this.targetCount;
  }

  increment() {
    if (this.currentCount < this.targetCount) {
      this.currentCount += 1;
      this.updatedAt = new Date().toISOString();
    }
  }

  reset() {
    this.currentCount = 0;
    this.updatedAt = new Date().toISOString();
  }
}

export class SecretNote {
  constructor(data = {}) {
    this.id = data.id || generateUUID();
    this.title = data.title || '';
    // المحتوى مشفر دائماً
    this.encryptedContent = data.encryptedContent || '';
    this.mood = data.mood || 'general'; // general | prayer | duaa | reflection
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }
}

export class NameOfAllah {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.meaning = data.meaning || '';
    this.description = data.description || '';
    this.relatedZikr = data.relatedZikr || '';
    this.glowColor = data.glowColor || '#00D4FF';
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

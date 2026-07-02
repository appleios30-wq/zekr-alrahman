// ============================================================================
//  Database Schema - مخطط قاعدة البيانات (SQLite)
// ============================================================================

export const DB_NAME = 'zekr_alrahman.db';

export const SCHEMA = {
  zikr: `
    CREATE TABLE IF NOT EXISTS zikr (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      target_count INTEGER NOT NULL DEFAULT 33,
      current_count INTEGER NOT NULL DEFAULT 0,
      reference TEXT,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_zikr_category ON zikr(category);
    CREATE INDEX IF NOT EXISTS idx_zikr_favorite ON zikr(is_favorite);
  `,

  secret_notes: `
    CREATE TABLE IF NOT EXISTS secret_notes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      encrypted_content TEXT NOT NULL,
      mood TEXT NOT NULL DEFAULT 'general',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `,

  app_settings: `
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `,
};

export const MIGRATIONS = [
  // v1: Initial schema
  {
    version: 1,
    scripts: [SCHEMA.zikr, SCHEMA.secret_notes, SCHEMA.app_settings],
  },
];

/**
 * Queries helper
 */
export const QUERIES = {
  zikr: {
    getAll: `SELECT * FROM zikr ORDER BY updated_at DESC;`,
    getByCategory: `SELECT * FROM zikr WHERE category = ? ORDER BY updated_at DESC;`,
    getFavorites: `SELECT * FROM zikr WHERE is_favorite = 1 ORDER BY updated_at DESC;`,
    getById: `SELECT * FROM zikr WHERE id = ? LIMIT 1;`,
    insert: `
      INSERT INTO zikr (id, title, content, category, target_count, current_count, reference, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    update: `
      UPDATE zikr SET title = ?, content = ?, category = ?, target_count = ?, current_count = ?,
      reference = ?, is_favorite = ?, updated_at = ? WHERE id = ?;
    `,
    delete: `DELETE FROM zikr WHERE id = ?;`,
    resetCount: `UPDATE zikr SET current_count = 0, updated_at = ? WHERE id = ?;`,
    incrementCount: `UPDATE zikr SET current_count = current_count + 1, updated_at = ? WHERE id = ?;`,
  },

  secretNotes: {
    getAll: `SELECT id, title, mood, created_at, updated_at FROM secret_notes ORDER BY updated_at DESC;`,
    getById: `SELECT * FROM secret_notes WHERE id = ? LIMIT 1;`,
    insert: `
      INSERT INTO secret_notes (id, title, encrypted_content, mood, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?);
    `,
    update: `
      UPDATE secret_notes SET title = ?, encrypted_content = ?, mood = ?, updated_at = ? WHERE id = ?;
    `,
    delete: `DELETE FROM secret_notes WHERE id = ?;`,
  },

  settings: {
    get: `SELECT value FROM app_settings WHERE key = ? LIMIT 1;`,
    set: `INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?);`,
  },
};

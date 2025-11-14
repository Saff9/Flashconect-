// FlashConnect - Constants
// src/utils/constants.js

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  VOICE: 'voice'
};

export const CHAT_TYPES = {
  DIRECT: 'direct',
  GROUP: 'group',
  CHANNEL: 'channel'
};

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
};

export const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
};

export const MESSAGE_RETENTION_DAYS = 7;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const STORAGE_KEYS = {
  THEME: 'flashconnect-theme',
  USER_PREFERENCES: 'flashconnect-preferences'
};

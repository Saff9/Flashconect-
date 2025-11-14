// FlashConnect - Validation Functions
// src/utils/validation.js

import { FILE_CONFIG } from './constants';

/**
 * Validate message text
 */
export const validateMessage = (text) => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (text.trim().length > 1000) {
    return { isValid: false, error: 'Message too long (max 1000 characters)' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate file upload
 */
export const validateFile = (file) => {
  // Check file size
  if (file.size > FILE_CONFIG.MAX_SIZE) {
    return { 
      isValid: false, 
      error: `File too large. Maximum size is ${FILE_CONFIG.MAX_SIZE / 1024 / 1024}MB` 
    };
  }
  
  // Check file type
  if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'File type not allowed. Allowed types: images, PDF, text documents' 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate chat name
 */
export const validateChatName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Chat name cannot be empty' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Chat name too long (max 50 characters)' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate user status
 */
export const validateStatus = (status) => {
  const allowedStatuses = ['online', 'away', 'busy', 'offline'];
  
  if (!allowedStatuses.includes(status)) {
    return { isValid: false, error: 'Invalid status' };
  }
  
  return { isValid: true, error: null };
};

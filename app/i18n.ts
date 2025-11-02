// Re-export from the root i18n configuration for backward compatibility
export { locales, defaultLocale, getDirection, getLocaleDisplayName } from '../i18n';
export type { Locale } from '../i18n';

/**
 * Common translation keys
 */
export const COMMON_KEYS = {
  // Navigation
  HOME: 'home',
  ABOUT: 'about',
  SERVICES: 'services',
  PORTFOLIO: 'portfolio',
  BLOG: 'blog',
  CONTACT: 'contact',
  
  // Actions
  SAVE: 'save',
  CANCEL: 'cancel',
  DELETE: 'delete',
  EDIT: 'edit',
  CREATE: 'create',
  VIEW: 'view',
  
  // Status
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  
  // Common words
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
  DATE: 'date',
  AMOUNT: 'amount',
  STATUS: 'status',
  ACTIONS: 'actions',
} as const;
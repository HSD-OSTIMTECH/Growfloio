/**
 * API katmanı - Django backend'e geçişte buradan yönetin.
 * Şu an Login mock; backend hazır olunca Login.tsx içinde auth.login() / auth.register() kullanın.
 */

export { api, apiRequest, getToken } from './client';
export { login, register, logout, getStoredToken } from './auth';
export type { User, LoginResponse } from './auth';

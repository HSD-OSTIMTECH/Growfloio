/**
 * Auth API - Django login/register ile değiştirilecek.
 * Backend hazır olunca bu fonksiyonları kullanın; Login.tsx sadece bu modülü çağırsın.
 */

import { api } from './client';

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await api.post<LoginResponse>('/auth/login/', { email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export async function register(name: string, email: string, password: string): Promise<LoginResponse> {
  const data = await api.post<LoginResponse>('/auth/register/', { name, email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export function logout(): void {
  localStorage.removeItem('token');
}

export function getStoredToken(): string | null {
  return localStorage.getItem('token');
}

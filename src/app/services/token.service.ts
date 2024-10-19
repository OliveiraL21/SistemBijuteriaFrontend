import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setItem(name: string, item: string): void {
    localStorage.setItem(name, item);
  }

  getToken(): string | undefined {
    return localStorage.getItem('token') ?? undefined;
  }

  getItem(name: string): string | undefined {
    return localStorage.getItem(name) ?? undefined;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  removeItem(name: string): void {
    localStorage.removeItem(name);
  }

  possuiToken(): boolean {
    return this.getToken() !== undefined ? true : false;
  }

  possuiItem(name: string): boolean {
    return this.getItem(name) ? true : false;
  }

  clearStorage() {
    localStorage.clear();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | undefined {
    return localStorage.getItem('token') ?? undefined;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  possuiToken(): boolean {
    return this.getToken() !== undefined ? true : false;
  }

  clearStorage() {
    localStorage.clear();
  }
}

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated(),
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private route: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    // Sincroniza o estado ao inicializar o serviço
    if (this.isAuthenticated()) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string; user: string }>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.setValues(response.token, response.user);
          this.isLoggedInSubject.next(true);
          this.route.navigate(['/backups']).catch((error) => {
            console.error('Navigation error:', error);
          });
        }),
      );
  }

  private setValues(token: string, user: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUser(): string | null {
    const user = localStorage.getItem('user');
    return user ? user : null;
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) return false;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        return !isExpired;
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
    }
    return false;
  }

  get isLoggedIn() {
    return this.isLoggedIn$;
  }

  logout(): Promise<void> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.clear();
        this.isLoggedInSubject.next(false);
        this.route
          .navigate(['/login'])
          .catch((error) => console.error('Logout error', error));
      }
      resolve();
    });
  }
}

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'app/model/Users';
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
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    // Sincroniza o estado ao inicializar o serviço
    if (this.isAuthenticated()) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string; user: Users }>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.setValues(response.token, response.user);
          this.isLoggedInSubject.next(true);
          this.route.navigate(['/backups']);
        }),
      );
  }

  private setValues(token: string, user: Users): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUser(): Users {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
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
        this.route.navigate(['/login']);
      }
      resolve();
    });
  }
}
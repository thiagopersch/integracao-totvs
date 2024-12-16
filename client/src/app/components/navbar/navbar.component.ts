import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { LoadingService } from '../loading/loading.service';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    LogoComponent,
  ],
})
export class NavbarComponent implements OnInit {
  userMenu: any;
  userName: string | null = null;
  isMobile: boolean = false;
  isLoggedIn: boolean = false;
  windowLength = 768;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loading: LoadingService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  ngOnInit(): void {
    this.getData();

    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= this.windowLength;
    }
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

  getData() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const user = this.authService.getUser();
        this.userName = user ? user.name : null;
        this.isLoggedIn = true;
      }
    });
  }

  navigateToBackup() {
    this.router.navigateByUrl('/backups');
  }

  navigateToClients() {
    this.router.navigateByUrl('/registers');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  async logout() {
    try {
      this.showLoading();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await this.authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      this.hideLoading();
    }
  }
}

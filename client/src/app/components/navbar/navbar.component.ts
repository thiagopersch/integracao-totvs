import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit(): void {
    this.getData();
    this.windowLengthChange();
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

  windowLengthChange() {
    this.isMobile = window.innerWidth <= this.windowLength;
  }

  getData() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const user = this.authService.getUser();
        this.userName = user;
        this.isLoggedIn = true;
      }
    });
  }

  navigateToBackup() {
    this.router.navigateByUrl('/automation');
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

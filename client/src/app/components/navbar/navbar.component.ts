import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { filter } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { ImageComponent } from './image/image.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    ImageComponent,
  ],
})
export class NavbarComponent implements OnInit {
  currentRoute: string | null = null;
  userName: string | null = null;
  isLoggedIn: boolean = true;
  isMobile: boolean = false;
  windowLength = 768;

  constructor(
    private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  ngOnInit(): void {
    this.getData();

    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= this.windowLength;
    }

    this.activeUrl();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = event.target.innerWidth <= this.windowLength;
    }
  }

  getData() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const user = this.authService.getUser();
        this.userName = user ? user : null;
        this.isLoggedIn = true;
      }
    });
  }

  activeUrl = () => {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        if (url.includes('automations')) {
          this.currentRoute = 'automations';
        } else if (url.includes('registers')) {
          this.currentRoute = 'registers';
        } else {
          this.currentRoute = 'automations';
        }
      });
  };

  navigateToAutomations() {
    this.currentRoute = 'automations';
    this.router.navigateByUrl('/automations');
  }

  navigateToRegisters() {
    this.currentRoute = 'registers';
    this.router.navigateByUrl('/registers');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  async logout() {
    try {
      this.showLoading();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await this.authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      this.hideLoading();
    }
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }
}

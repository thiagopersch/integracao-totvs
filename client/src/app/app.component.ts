import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoadingComponent, NavbarComponent, CommonModule],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(
    public loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadingService.show();
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.authService.initializeAuthState().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/automations']);
      } else {
        this.router.navigate(['/login']);
      }
      this.loadingService.hide();
    });
  }
}

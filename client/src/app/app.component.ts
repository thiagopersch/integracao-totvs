import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoadingComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'client';
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    setTimeout(() => this.loadingService.show());
    this.isLoggedIn$ = this.authService.isLoggedIn;
    setTimeout(() => this.loadingService.hide());
  }
}

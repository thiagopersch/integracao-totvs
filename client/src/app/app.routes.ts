import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistersComponent } from './pages/registers/registers.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/registers',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'registers',
    component: RegistersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

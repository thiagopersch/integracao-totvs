import { Routes } from '@angular/router';
import { AutomationsComponent } from './pages/private/automations/automations.component';
import { RegistersComponent } from './pages/private/registers/registers.component';
import { LoginComponent } from './pages/public/login/login.component';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/automations',
    pathMatch: 'full',
  },
  {
    path: 'automations',
    component: AutomationsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'registers',
    component: RegistersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

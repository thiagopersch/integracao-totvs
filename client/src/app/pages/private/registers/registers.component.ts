import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientsComponent } from './shared/clients/clients.component';
import { UsersComponent } from './shared/users/users.component';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss',
  imports: [ClientsComponent, UsersComponent, MatCardModule, MatTabsModule],
})
export class RegistersComponent {}

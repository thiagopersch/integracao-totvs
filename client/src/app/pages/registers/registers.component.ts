import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { ClientsComponent } from './clients/clients.component';
import { TbcComponent } from './tbc/tbc.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    UsersComponent,
    TbcComponent,
    ClientsComponent,
  ],
})
export class RegistersComponent {}

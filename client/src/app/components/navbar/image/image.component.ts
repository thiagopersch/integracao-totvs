import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  imports: [MatButtonModule],
})
export class ImageComponent {
  constructor(private router: Router) {}

  goTo() {
    this.router.navigateByUrl('/');
  }
}

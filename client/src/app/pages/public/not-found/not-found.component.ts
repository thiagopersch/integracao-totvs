import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ImageComponent } from './image/image.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [ImageComponent, MatButtonModule],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  backToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.router.navigate(['/']);
  }
}

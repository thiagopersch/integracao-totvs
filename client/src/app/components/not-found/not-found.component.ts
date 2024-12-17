import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone: true,
  imports: [MatButtonModule],
})
export class NotFoundComponent implements OnInit {
  @Input() ctaLabel: string = '';
  @Input() addFn!: () => void;
  constructor() {}

  ngOnInit(): void {}
}

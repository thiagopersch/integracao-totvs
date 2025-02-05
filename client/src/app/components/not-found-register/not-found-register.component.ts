import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found-register',
  templateUrl: './not-found-register.component.html',
  styleUrl: './not-found-register.component.scss',
  imports: [MatButtonModule],
})
export class NotFoundRegisterComponent implements OnInit {
  @Input() ctaLabel: string = '';
  @Input() addRegisterFn!: () => void;
  constructor() {}

  ngOnInit() {}
}

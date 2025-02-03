import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found-register',
  imports: [],
  templateUrl: './not-found-register.component.html',
  styleUrl: './not-found-register.component.scss',
})
export class NotFoundRegisterComponent {
  @Input() ctaLabel: string = '';
  @Input() addRegisterFn!: () => void;
  constructor() {}

  ngOnInit() {}
}

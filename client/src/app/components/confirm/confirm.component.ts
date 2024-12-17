import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

type ConfirmData = {
  title: string;
  message: string;
  btnCancelText: string;
  confirmText: string;
  cancelText: string;
  btnOkText: string;
};

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class ConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmData) {}
  ngOnInit() {}
}

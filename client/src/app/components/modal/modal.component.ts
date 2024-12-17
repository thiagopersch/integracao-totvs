import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

type ModalProps = {
  id?: string;
  customContent?: any;
  title: string;
  isHandleClose: boolean;
  disableClose: boolean;
  data?: {
    [key: string]: any;
  };
  customClassContainer?: string | string[];
  enableFullscreen: boolean;
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
  ],
})
export class ModalComponent implements OnInit {
  isFullscreen: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalProps,
  ) {}

  ngOnInit() {}

  closeModal = (): void => {
    this.dialogRef.close();
  };

  toggleFullscreen() {
    const dialogElement = document.querySelector('.mat-dialog-container');

    if (dialogElement) {
      if (this.isFullscreen) {
        dialogElement.classList.remove('fullscreen');
      } else {
        dialogElement.classList.add('fullscreen');
      }
      this.isFullscreen = !this.isFullscreen;
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActionsComponent } from 'app/components/actions/actions.component';
import { ColumnComponent } from 'app/components/column/column.component';
import { LoadingService } from 'app/components/loading/loading.service';
import { ToastService } from 'app/components/toast/toast.service';
import { ValidationService } from 'app/services/validation/validation.service';
import { Clients } from 'app/types/Clients';
import { MESSAGES } from 'app/types/messages';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    CommonModule,
    ColumnComponent,
    ActionsComponent,
  ],
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  clients: Clients[] = [];
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private clientService: ClientsService,
    private snackService: ToastService,
    private loadingService: LoadingService,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { client: Clients },
  ) {
    this.clientForm = this.createForm();
  }

  ngOnInit() {
    this.checkEditMode();
  }

  checkEditMode() {
    if (this.data?.client) {
      this.isEdit = true;
    }
  }

  createForm() {
    return this.fb.group({
      id: [this.data?.client?.id ?? ''],
      name: [
        this.data?.client?.name ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      link_crm: [
        this.data?.client?.link_crm ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      status: [this.data?.client?.status ?? true],
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.clientForm.get(controlName);
    return control?.errors
      ? this.validationService.getErrorMessage(control)
      : null;
  }

  onSuccess(message: string) {
    this.loadingService.show();
    this.snackService.openSuccess(message);
    this.dialogRef.close(this.clientForm.value);
  }

  onError(message: string) {
    this.loadingService.show();
    this.snackService.openError(message);
  }

  handleBack() {
    this.dialogRef.close();
  }

  handleSubmit() {
    const client = this.clientForm.value;

    if (!client) {
      return;
    }

    if (this.isEdit) {
      this.handleUpdate(client.id, client);
    } else {
      this.handleCreate(client);
    }
  }

  handleCreate(data: Clients) {
    this.clientService.create(data).subscribe({
      next: () => this.onSuccess(MESSAGES.CREATE_SUCCESS),
      error: () => this.onError(MESSAGES.CREATE_ERROR),
      complete: () => this.loadingService.hide(),
    });
  }

  handleUpdate(id: string, data: Clients) {
    this.clientService.update(id, data).subscribe({
      next: () => this.onSuccess(MESSAGES.UPDATE_SUCCESS),
      error: () => this.onError(MESSAGES.UPDATE_ERROR),
      complete: () => this.loadingService.hide(),
    });
  }
}

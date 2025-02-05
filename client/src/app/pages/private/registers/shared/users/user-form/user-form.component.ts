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
import { MESSAGES } from 'app/types/messages';
import { Users } from 'app/types/Users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
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
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Users[] = [];
  isEdit: boolean = false;
  hide: boolean = true;
  change_password: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private usersService: UsersService,
    private snackService: ToastService,
    private loadingService: LoadingService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { users: Users },
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    this.checkEditMode();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.data?.users?.id ?? ''],
      name: [
        this.data?.users?.name ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      email: [
        this.data?.users?.email ?? '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      password: [
        this.data?.users?.password ?? '',
        this.data?.users
          ? []
          : [
              Validators.required,
              this.validationService.passwordValidator(),
              Validators.minLength(8),
              Validators.maxLength(30),
            ],
      ],
      status: [this.data?.users?.status ?? true],
      change_password: [this.data?.users?.change_password ?? true],
    });
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }

  checkEditMode() {
    if (this.data?.users) {
      this.isEdit = true;
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  changePassword() {
    this.change_password = !this.change_password;
    const passwordControl = this.userForm.get('password');

    if (this.change_password) {
      passwordControl?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]);
    } else {
      passwordControl?.reset();
    }

    passwordControl?.updateValueAndValidity();
  }

  getErrorMessage(controlName: string) {
    const control = this.userForm.get(controlName);
    return control?.errors
      ? this.validationService.getErrorMessage(control)
      : null;
  }

  onSuccess(message: string) {
    this.loadingService.hide();
    this.snackService.openSuccess(message);
    this.dialogRef.close(this.userForm.value);
  }

  onError(message: string) {
    this.loadingService.hide();
    this.snackService.openError(message);
  }

  handleBack() {
    this.dialogRef.close();
  }

  handleSubmit() {
    const user = this.userForm.value;

    if (!user) {
      return;
    }

    if (this.change_password) {
      this.userForm.get('password')?.setValidators([Validators.required]);
    }

    if (this.isEdit) {
      this.handleUpdate(user.id, user);
    } else {
      this.handleCreate(user);
    }
  }

  handleCreate(data: Users) {
    this.loadingService.show();
    this.usersService.createUser(data).subscribe({
      next: () => this.onSuccess(MESSAGES.CREATE_SUCCESS),
      error: (error) => {
        const errorMessage = error.error.message ?? MESSAGES.CREATE_ERROR;
        this.onError(errorMessage);
      },
      complete: () => this.loadingService.hide(),
    });
  }

  handleUpdate(userId: string, data: Users) {
    this.loadingService.show();
    this.usersService.updateUser(userId, data).subscribe({
      next: () => this.onSuccess(MESSAGES.UPDATE_SUCCESS),
      error: (error) => {
        const errorMessage = error.error.message ?? MESSAGES.UPDATE_ERROR;
        this.onError(errorMessage);
      },
      complete: () => this.loadingService.hide(),
    });
  }
}

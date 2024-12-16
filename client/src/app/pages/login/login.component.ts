import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { ActionsComponent } from "app/components/actions/actions.component";
import { ColumnComponent } from "app/components/column/column.component";
import { LoadingService } from "app/components/loading/loading.service";
import { MESSAGES } from "app/components/toast/messages";
import { ToastService } from "app/components/toast/toast.service";
import { AuthService } from "app/services/auth/auth.service";
import { ValidationService } from "app/services/validation/validation.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    ColumnComponent,
    ActionsComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  change_password: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loading: LoadingService,
    private toast: ToastService,
    private authService: AuthService,
    private validationService: ValidationService,
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit() {}

  createForm() {
    return (this.loginForm = this.fb.group({
      email: [
        "administrador@rubeus.com",
        [Validators.required, Validators.email],
      ],
      password: [
        "#mpresaPC10",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    }));
  }

  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.errors
      ? this.validationService.getErrorMessage(control)
      : null;
  }

  onSuccess(message: string) {
    this.hideLoading();
    this.toast.openSuccess(message);
    this.router.navigate(["/backups"]);
  }

  onError(message: string) {
    this.hideLoading();
    this.toast.openError(message);
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    this.showLoading();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.onSuccess(MESSAGES.LOGIN_SUCCESS),
        error: () => this.onError(MESSAGES.LOGIN_ERROR),
        complete: () => this.hideLoading(),
      });
    }
  }
}

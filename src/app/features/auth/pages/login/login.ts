import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomInput } from '@shared/components/input/input';
import { Button } from '@shared/components/button/button';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    CustomInput,
    Button,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  AppName = environment.appName;

  activeTab: 'phone' | 'email' = 'phone';

  form = this.fb.group({
    phone: ['+998', Validators.required],
    email: [''],
    password: ['', Validators.required],
    remember: [false],
  });

  submit() {
    if (this.form.invalid) return;

    console.log(this.form.value);
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Button } from '@shared/components/button/button';
import { CustomInput } from '@shared/components/input/input';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-forgot',
  imports: [Button, CustomInput, ReactiveFormsModule],
  templateUrl: './forgot.html',
  styleUrl: './forgot.scss',
})
export class Forgot {
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

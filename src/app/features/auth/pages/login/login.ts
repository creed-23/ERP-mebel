import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomInput } from '@shared/components/input/input';
import { Button } from '@shared/components/button/button';
import { environment } from '@env/environment';
import { AuthService } from '@core/services/auth.service';
import { PathResources } from '@shared/resources/path_resource';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    TranslatePipe,
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
  private auth = inject(AuthService);
  private router = inject(Router);

  AppName = environment.appName;
  activeTab: 'phone' | 'email' = 'phone';

  phone = '';
  password = '';
  remember = false;
  loading = signal(false);

  submit(): void {
    this.loading.set(true);
    this.auth.login({ phone: this.phone, password: this.password, remember: this.remember }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/', PathResources.DASHBOARD]);
      },
      error: () => this.loading.set(false),
    });
  }
}

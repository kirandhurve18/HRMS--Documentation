import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { SpinnerHelper } from '../../core/services/spinner-helper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  submitted = false;
  logoExists = true;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private spinner = inject(SpinnerHelper);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

 onSubmit(): void {
  this.submitted = true;
  if (this.loginForm.invalid) return;

  const credentials = this.loginForm.value;
  this.spinner.show();

  this.auth.login(credentials).subscribe({
    next: (res) => {
      this.spinner.hide();
      console.log('Login API response:', res);

      if (res.success && res.data) {
        const token: string = res.data.token;
        const role: string = res.data.role;
        const email: string = res.data.email;
        const employee_id: string = res.data._id;  // ✅ map _id -> employee_id
        const full_name: string = res.data.full_name; // ✅ take name from API

        // ✅ Store via AuthService
        this.auth.storeAuthData(token, role, employee_id, email, full_name);

        // ✅ Redirect user based on role
        if (role === 'super-admin') {
          this.router.navigate(['/superadmin/dashboard']);
        } else if (role === 'employee') {
          this.router.navigate(['/employee/dashboard']);
        } else {
          alert('Unknown role: ' + role);
          this.router.navigate(['/login']);
        }
      } else {
        alert(res.message || 'Login failed');
      }
    },
    error: (err) => {
      this.spinner.hide();
      console.error('Login error', err);
      alert('Login failed. Please check your credentials.');
    }
  });
}

}

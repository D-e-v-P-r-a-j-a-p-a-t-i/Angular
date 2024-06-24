import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private appService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern("^[A-Za-z]+(?:[-' ][A-Za-z]+)*$"),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.pattern("^[A-Za-z]+(?:[-' ][A-Za-z]+)*$"),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          '',
          [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
        ],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  registerSubmitted() {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      const user: User = this.registerForm.value as User;
      this.appService.addUser(user).subscribe(
        (result) => {
          alert('Registration successful!');
          this.router.navigateByUrl('/login');
          this.registerForm.reset();
        },
        (error) => {
          alert(error.error.message)
        }
      );
    }
    if(this.registerForm.errors?.['passwordMismatch']){
      alert("Password doesn't match Confirm Password!")
    }
    this.registerForm.markAllAsTouched()
  }

  reset() {
    this.registerForm.reset();
  }

  private passwordMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}

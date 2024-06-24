import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private appService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.appService.generateToken(formData.email, formData.password).subscribe(
        res => {
          console.log(res.token);
          if(this.appService.loginUser(res.token))
            this.router.navigate(['/']);
        },
        error => {
          console.log("error",error);
        }
      )
    }
    this.loginForm.markAllAsTouched()
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports:[CommonModule, RouterLink, ReactiveFormsModule],
  standalone:true,
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.userService.generateToken(formData.email, formData.password).subscribe(

        (res: any) => {
          console.log(res.token);
          if (this.userService.loginUser(res.token)) {
            console.log(jwtDecode(res.token))
            this.router.navigate(['/']);
          }
        },
        error => {
          console.log("kfjnekjnkwjn");
          console.error("Error:", error);
        }
      );
    } else {
      // Mark form controls as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }
}

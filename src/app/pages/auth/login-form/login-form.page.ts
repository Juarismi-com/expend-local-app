import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage {

  loginForm: FormGroup; 
  email: string = '';
  password: string = '';

  constructor(   
    private formBuilder: FormBuilder,  
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });  
  }    

  async loginFormSubmit() {       
    try {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      this.router.navigate(['/dashboard/dashboard-vendedor']);
    } catch (error) {
      console.log(error);
    }
  }
}

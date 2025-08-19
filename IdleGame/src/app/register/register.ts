import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       username: ['', Validators.required ],
       password: ['',Validators.required]
     });
   }

   tryRegister(value: any){
     this.authService.doRegister(value)
   }

}
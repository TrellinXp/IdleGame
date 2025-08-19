import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';
import { getAnalytics } from "firebase/analytics";
import { AuthService } from '../auth';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';
  userid: string = '';

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
      // Initialize Firebase
      if (!firebase.apps.length) {
        const app = firebase.initializeApp(environment.firebase);
        const analytics = getAnalytics(app);
      } else {
        firebase.app(); // if already initialized, use that one
        console.log("Firebase already initialized");
      }

      this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value: any) {
    this.authService.doLogin(value)
    this.userid = this.authService.getLogedInUserId();
  }
}



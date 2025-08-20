import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';
import { getAnalytics } from "firebase/analytics";
import { AuthService } from '../auth';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

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
  displayName: string = '';
  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
      this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if(user && this.authService.user?.displayName) {
        this.displayName = this.authService.user?.displayName;
      }
    })
  }

  tryLogin(value: any) {
    this.authService.doLogin(value)
  }

  tryLogout() {
    this.authService.doLogout();
    this.displayName = "";
  }
}



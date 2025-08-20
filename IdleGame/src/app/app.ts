import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { AuthService } from './auth';
import firebase from 'firebase/compat/app';
import { environment } from './environments/environment';
import { getAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('idlegame');

  authService = inject(AuthService);

  ngOnInit() {
      // Initialize Firebase
      if (!firebase.apps.length) {
        const app = firebase.initializeApp(environment.firebase);
        const analytics = getAnalytics(app);
      } else {
        firebase.app(); // if already initialized, use that one
        console.log("Firebase already initialized");
      }

    this.authService.user$.subscribe(user => {
      if(user) {
        this.authService.userId = user.uid;
        this.authService.user = user;
        console.log("App.ts Login with userId " + this.authService.userId);
      }
    })
  }
}

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "idle-dinosaur-angular", appId: "1:732585017361:web:ecd596390717e4963931b0", storageBucket: "idle-dinosaur-angular.firebasestorage.app", apiKey: "AIzaSyAR7WuC11Sm5Hp8bS3C71rqBR2s6qF8u-M", authDomain: "idle-dinosaur-angular.firebaseapp.com", messagingSenderId: "732585017361", measurementId: "G-1SZQ17VPPJ" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};

import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, inMemoryPersistence, signOut, updateProfile, User, browserSessionPersistence} from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // auth instance
  auth = inject(Auth);
  userId : string = '';
  user : User | undefined;
  user$ = user(this.auth);

  doRegister(value: { email: any; password: any; username: any }){
    createUserWithEmailAndPassword(getAuth(), value.email, value.password)
    .then((result) => {
          console.log(result.user)
          this.updateUsername(value)
        }).catch((error) => {
          window.alert(error.message)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  updateUsername(value: { email: any; password: any; username: any }) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: value.username
      }).then(() => {
        // Profile updated!
        console.log("Username set to "+value.username);
      }).catch((error) => {
        // An error occurred
        console.error("An error occured setting the username "+error);
      });
    }
  }

  doLogin(value: { email: any; password: any; }){
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
    signInWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    }); 
  }

  doLogout(){
    signOut(getAuth()).then(() => {
      this.user = undefined;
    }).catch((error) => {
      // An error happened.
    });
  }
}

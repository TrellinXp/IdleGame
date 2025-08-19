import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, inMemoryPersistence, signOut} from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // auth instance
  auth = inject(Auth);
  
  doRegister(value: { email: any; password: any; username: any }){
    createUserWithEmailAndPassword(getAuth(), value.email, value.password)
    .then((result) => {
          console.log(result.user)
        }).catch((error) => {
          window.alert(error.message)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  doLogin(value: { email: any; password: any; }){
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
    signInWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      if(this.auth.currentUser?.uid) {
        console.log("Loged In User: "+this.auth.currentUser?.uid);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    }); 
  }

  getLogedInUserId() {
      if(this.auth.currentUser?.uid) {
        console.log("Loged In User: "+this.auth.currentUser?.uid);
        return this.auth.currentUser?.uid;
      }
      return "";
  }

  doLogout(){
    signOut(getAuth()).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
}

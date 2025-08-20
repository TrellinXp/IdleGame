import { Component } from '@angular/core';
import { NgFor} from '@angular/common'; 
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { DinosaurClass } from './dinosaurClass';
import { getAnalytics } from "firebase/analytics";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth } from '@angular/fire/auth';
import { AuthService } from '../auth';

@Component({
  selector: 'app-dinosaurs',
  imports: [NgFor, FormsModule,
        ReactiveFormsModule],
  templateUrl: './dinosaurs.html',
  styleUrl: './dinosaurs.scss'
})
export class Dinosaurs {
  dinosaurs: any[] = [];
  uid: string;

  constructor() {
    this.uid = '';
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        this.uid = user.uid;
        this.dinosaurs = [];
        this.fetchDinosaurs();
      } else {
        this.dinosaurs = [];
      }
    });

    console.log("Dinosaurs component initialized");
  }

  async fetchDinosaurs(): Promise<void> {

    console.log("Get Dinosaurs for user: "+this.uid);
    const db = getFirestore(firebase.app());
    const querySnapshot = await getDocs(collection(db, "dinosaurs"));
    querySnapshot.forEach((doc) => {
      var dinosaur = doc.data();
      dinosaur['id'] = doc.id 
      if(dinosaur['userId'] == this.uid) {
        this.dinosaurs.push(dinosaur);
      }
    });
    console.log("Finished fetching dinosaurs from Firestore")
    this.dinosaurs.sort((a, b) => a.name.localeCompare(b.name));  
  }

  levelDinosaur(dinosaur: DinosaurClass): void {
    console.log("Level Dinosaur"); 
    dinosaur.level = dinosaur.level + 1;   
    updateDinosaur(dinosaur); // Call the function to update the dinosaur
  }

}

  async function updateDinosaur(dinosaur: DinosaurClass) {
    const db = getFirestore(firebase.app());
    const dinosaurRef = doc(db, "dinosaurs", dinosaur.id);

    await updateDoc(dinosaurRef, {
      level : dinosaur.level
    });
    console.log("Dinosaur updated in Firestore:", dinosaur.name);
  }




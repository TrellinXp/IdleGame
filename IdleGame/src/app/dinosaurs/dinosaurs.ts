import { Component } from '@angular/core';
import { NgFor} from '@angular/common'; 
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
@Component({
  selector: 'app-dinosaurs',
  imports: [NgFor],
  templateUrl: './dinosaurs.html',
  styleUrl: './dinosaurs.scss'
})
export class Dinosaurs {
  dinosaurs: any[] = [];

  constructor() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    } else {
      firebase.app(); // if already initialized, use that one
      console.log("Firebase already initialized");
    }

    this.fetchDinosaurs();
    console.log("Dinosaurs component initialized");
  }

  async fetchDinosaurs(): Promise<void> {
    const db = getFirestore(firebase.app());
    const querySnapshot = await getDocs(collection(db, "dinosaurs"));
    querySnapshot.forEach((doc) => {
      this.dinosaurs.push(doc.data());
    });
    console.log("Finished fetching dinosaurs from Firestore")
    this.dinosaurs.sort((a, b) => a.name.localeCompare(b.name));  
  }
}



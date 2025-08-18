import { Component } from '@angular/core';
import { NgFor} from '@angular/common'; 
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { DinosaurClass } from './dinosaurClass';
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
      var dinosaur = doc.data();
      dinosaur['id'] = doc.id 
      this.dinosaurs.push(dinosaur);
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




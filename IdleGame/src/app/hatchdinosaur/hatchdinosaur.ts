import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { environment } from '../environments/environment';
import { collection, doc, getDocs, getFirestore, addDoc, updateDoc } from "firebase/firestore";
@Component({
  selector: 'app-hatchdinosaur',
  imports: [],
  templateUrl: './hatchdinosaur.html',
  styleUrl: './hatchdinosaur.scss'
})
export class Hatchdinosaur {
  display: any;

  dinosaurs: any[] = [
    { name: "Amargasaurus", level: 1, attack: 10, hp: 10, image: "amargasaurus.png" },
    { name: "Apatosaurus", level: 1, attack: 11, hp: 11, image: "apatosaurus.png" },
    { name: "Azendohsaurus", level: 1, attack: 12, hp: 12, image: "azendohsaurus.png" },  
    { name: "Beipiaosaurus", level: 1, attack: 13, hp: 13, image: "beipiaosaurus.png" },
    { name: "Corythosaurus", level: 1, attack: 14, hp: 14, image: "corythosaurus.png" },
    { name: "Pachycephalosaurus", level: 1, attack: 15, hp: 15, image: "pachycephalosaurus.png"},
    { name: "Stegosaurus", level: 1, attack: 16, hp: 16, image: "stegosaurus.png" },
    { name: "Tyrannosaurus", level: 1, attack: 17, hp: 17, image: "tyrannosaurus.png" },
    { name: "Velociraptor", level: 1, attack: 18, hp: 18, image: "velociraptor.png" },
  ]
  
  constructor() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    } else {
      firebase.app(); // if already initialized, use that one
      console.log("Firebase already initialized");
    }
  }

  timer(minute: number) {
    // let minute = 1;

    // Change Seconds and Stat Seconds to 60
    let seconds: number = minute * 2;
    let textSec: any = "0";
    let statSec: number = 2;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        this.hatchEgg();
        clearInterval(timer);
      }
    }, 1000);
  }

  startTimer() {
    this.timer(1);
  }

  async hatchEgg() {

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(firebase.app());

    const querySnapshot = await getDocs(collection(db, "dinosaurs"));
      querySnapshot.forEach((doc) => {
        var data = doc.data();
        console.log(data['name']);
        this.dinosaurs = this.dinosaurs.filter(dinosaur => dinosaur.name !== data['name']);
      });

    // Add a new document with a generated ID

    var random = Math.floor(Math.random() * this.dinosaurs.length); 

    if (this.dinosaurs.length == 0) {
      console.log("No more dinosaurs to hatch");
      return;
    }

    const docRef = await addDoc(collection(db, "dinosaurs"), {
      name: this.dinosaurs[random].name,
      level: this.dinosaurs[random].level,
      attack: this.dinosaurs[random].attack,
      image: this.dinosaurs[random].image,
      hp: this.dinosaurs[random].hp, 
      });

    console.log("Added dinosaur with name : ", this.dinosaurs[random].name);
  }

}

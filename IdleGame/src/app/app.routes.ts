import { Routes } from '@angular/router';
import { Dinosaurs } from './dinosaurs/dinosaurs';
import { Credits } from './credits/credits';
import { Arena } from './arena/arena';
import { Hatchdinosaur } from './hatchdinosaur/hatchdinosaur';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
    { path: 'dinosaurs', component: Dinosaurs },
    { path: 'credits', component: Credits },
    { path: 'arena', component: Arena },
    { path: 'hatchdinosaur', component: Hatchdinosaur},
    { path: 'register', component: RegisterComponent},
    { path: '',   redirectTo: '/dinosaurs', pathMatch: 'full' }
  ];


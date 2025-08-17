import { Routes } from '@angular/router';
import { Dinosaurs } from './dinosaurs/dinosaurs';
import { Credits } from './credits/credits';
import { Arena } from './arena/arena';

export const routes: Routes = [
    { path: 'dinosaurs', component: Dinosaurs },
    { path: 'credits', component: Credits },
    { path: 'arena', component: Arena },
    { path: '',   redirectTo: '/dinosaurs', pathMatch: 'full' }
  ];


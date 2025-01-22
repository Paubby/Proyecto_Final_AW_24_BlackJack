import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'black-jack',
    loadComponent: () => import('./black-jack/black-jack.page').then( m => m.BlackJackPage)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./ranking/ranking.page').then( m => m.RankingPage)
  },
];

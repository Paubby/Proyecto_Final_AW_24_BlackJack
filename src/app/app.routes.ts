import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'black-jack',
    loadComponent: () => import('./black-jack/black-jack.page').then( m => m.BlackJackPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./ranking/ranking.page').then( m => m.RankingPage),
    canActivate: [AuthGuard]
  },
];

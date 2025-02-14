
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AuthService } from '@auth0/auth0-angular';
import * as icons from 'ionicons/icons';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
 IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonButton, IonCol, IonGrid, IonRow  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonButton, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, RouterLink, RouterLinkActive],
})
export class AppComponent {
  public appPages = [
    { title: 'Log In', url: '/login', icon: 'accessibility' },
    { title: 'Inicio', url: '/home', icon: 'card' },
    { title: 'Black Jack', url: '/black-jack', icon: 'cash' },
    { title: 'Ranking', url: '/ranking', icon: 'bar-chart' },
  ];
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {
    addIcons(icons);
  }

  logOut(){
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin 
      }
    });
  }
}

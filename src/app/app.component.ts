
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, RouterLink, RouterLinkActive],
})
export class AppComponent {
  public appPages = [
    { title: 'Log In', url: '/folder/inbox', icon: 'accessibility' },
    { title: 'Inicio', url: '/home', icon: 'card' },
    { title: 'Black Jack', url: '/black-jack', icon: 'cash' },
    { title: 'Ranking', url: '/ranking', icon: 'bar-chart' },
  ];
  constructor() {
    addIcons(icons);
  }
}

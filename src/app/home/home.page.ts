import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient } from "@angular/common/http"
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
 IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonButton, IonCol, IonGrid, IonRow} from '@ionic/angular/standalone';import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
// import { response } from 'express';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, RouterLink, CommonModule, FormsModule]
})
export class HomePage implements OnInit {



  constructor(private http: HttpClient, private router: Router, public auth: AuthService) { }

public user: any;


  ngOnInit() {
    // Cargar info desde auth
    this.auth.user$.subscribe((data) =>{
      this.user = data
      console.log(this.user)
        // Ahora hacer un INSERT INTO a la base de datos
      this.loadUser()

      this.createUser()

    })
    
    
  }


  loadUser(){
    this.http.get(`http://localhost:3000/jugadores/${this.user.email}`).subscribe((response: any) => {
      console.log(response)
      console.log(this.user.email)
      console.log(this.user.name)
      if(response == "El registro NO ha sido encontrado"){
        this.createUser()
      }
      
    });
  }

  createUser() {

    let new_user = {
      email: this.user.email,
      name: this.user.name,
      money: this.user.dinero
    }

    this.http.post('http://localhost:3000/crear', new_user).subscribe((response) => {
      console.log(response);
      console.log(new_user)
      console.log(new_user.money)
    });
  

}
irAlJuego(){
  this.router.navigate(['/black-jack']);
};

}

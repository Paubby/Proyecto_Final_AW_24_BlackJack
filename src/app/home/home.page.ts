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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
// import { response } from 'express';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, RouterLink, CommonModule, FormsModule],
})
export class HomePage implements OnInit {



  constructor(private http: HttpClient, private router: Router, public auth: AuthService) { }

public user: any;
public host: string = 'https://back-trabajo-final.onrender.com'
public hostlocal: string = 'http://localhost:3000'

public topPlayers: any = [
];

  ngOnInit() {
    // Cargar info desde auth
    this.auth.user$.subscribe((data) =>{
      this.user = data
      console.log(this.user)
        // Ahora hacer un INSERT INTO a la base de datos
      this.loadUser()

    })
    
    this.positions()
    
  }


  loadUser(){
    this.http.get(`${this.host}/jugadores/${this.user.email}`).subscribe((response: any) => {
      console.log(response)
      console.log(this.user.email)
      console.log(this.user.name)
      if (response?.message == "El registro NO ha sido encontrado") {
        this.createUser();
      } else {
        // this.loadUser()
      }
      
    });
}

  
createUser() {
  const newUser = {
    email: this.user.email,
    name: this.user.name
  };

  this.http.post<any>(`${this.host}/crear`, newUser).subscribe({ // Reemplaza 'any' con el tipo adecuado
    next: (response) => {
      console.log("Usuario creado:", response);
      // Realizar acciones adicionales si es necesario (ej: redirigir al juego)
       this.loadUser() //Volver a cargar el usuario para que ya no lo cree
    },
    error: (error) => {
      console.error("Error al crear usuario:", error);
      // Mostrar mensaje de error al usuario
    }
  });
}

positions() {
  console.log("Llamando al endpoint /ordenar");

  this.http.get(`${this.host}/ordenar`).subscribe({
    next: (response: any) => {
      console.log("Respuesta recibida:", response);
      this.topPlayers = response
      console.log("topPlayers =", this.topPlayers)
    },
    error: (error) => {
      console.error("Error en la petición:", error);
    }
  });
}



irAlJuego(){
  this.router.navigate(['/black-jack']);
};

}

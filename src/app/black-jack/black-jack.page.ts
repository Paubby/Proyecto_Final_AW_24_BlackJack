import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { AuthService } from '@auth0/auth0-angular';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
 IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonButton, IonCol, IonGrid, IonRow, IonInput } from '@ionic/angular/standalone';

import { baraja } from '../../assets/baraja';
import { response } from 'express';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.page.html',
  styleUrls: ['./black-jack.page.scss'],
  standalone: true,
  imports: [IonInput, IonRow, IonCol, IonGrid, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, RouterLink, CommonModule, FormsModule]
})
export class BlackJackPage implements OnInit {


  public host: string = 'https://back-trabajo-final.onrender.com'
  public hostlocal: string = 'http://localhost:3000'

  public vic!: number
  public der!: number

  public dinero!: any;
  public money: any;

  public apuestas: number = 0

  public apuesta: boolean = true
  public pri_empezar: boolean = true
  public parar_de_pedir: boolean = true
  public has_perdido: boolean = false
  public has_ganado: boolean = false
  public el_jugador_pasado: boolean = false
  public el_croupier_pasado: boolean = false
  public is_money_load: boolean = false


  public suma_mano_jugador: number = 0
  public suma_mano_croupier: number = 0
  public ganancia_del_juego: number = 0

  public user: any

  public baraja_principal: any = [
  ]

  public mano_croupier: any = [
  ]

  public mano_jugador: any = [
  ]

  public usuario_cargado: any

  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router, public auth: AuthService, private alertController: AlertController) { }

  ngOnInit() {

    // this.dinero = this.route.snapshot.params
    // console.log("DINERO", this.dinero)
    console.log(baraja)
    this.baraja_principal = baraja

  // Cargar info desde auth
  this.auth.user$.subscribe((data) =>{
    this.user = data
    console.log(this.user)
      // Ahora hacer un INSERT INTO a la base de datos
    this.loadUser()

  })

  // this.http.get(`${this.hostlocal}/jugadores/${this.user.email}`).subscribe((response: any) => {
  //   console.log(response)

  //   console.log(this.money)
  //   console.log(this.user.email)
  //   console.log(this.user.name) 
  // });
    
  }

  loadUser(){
    this.http.get(`${this.host}/jugadores/${this.user.email}`).subscribe((response: any) => {
      console.log(response)
      
      this.usuario_cargado = response
      this.is_money_load = true 
      console.log(this.usuario_cargado[0].dinero)
    });
  }



// EL PROBLEMA ES QUE SI NO LE DAS AL BOTON QUE ESTA DESHABILITADO NO SABE QUE ES apuestas
  async enviarDinero() {
  console.log("antes ", this.apuesta)
  console.log("antes ", this.apuestas)

  if (this.apuestas > this.usuario_cargado[0].dinero) {
    console.log("NO tienes suficiente dinero para apostar");

    // Crear una alerta en Ionic
      const alert = await this.alertController.create({
      header: "Apuesta inválida",
      message: "No tienes suficiente dinero para hacer esta apuesta",
      buttons: ["OK"]
    });
    await alert.present();

    return; // Detiene la ejecución
  }

    if (this.apuestas <= this.usuario_cargado[0].dinero && this.apuesta == true){
    console.log(this.dinero)
    this.usuario_cargado[0].dinero = this.usuario_cargado[0].dinero - this.apuestas
    console.log("dinero actual ", this.usuario_cargado[0].dinero)
    this.apuesta = false
  } /* else if(this.apuesta == false || this.apuestas > this.usuario_cargado[0].dinero){
    // Aquí poner que no pueda apostar, pq no sale nada pero estas apostando
    console.log("No tienes suficiente dinero para apostar.");
    return;
  }*/

  console.log("después ", this.apuesta)
  console.log("dinero ", this.usuario_cargado[0].dinero)
  console.log("tu apusesta =", this.apuestas)

  }

  // soundLose(){
  //   const sonido = new Audio('../../assets/vaca-saturnita'); // Ruta del archivo de audio
  //   sonido.play().catch(error => console.error("Error al reproducir el sonido:", error));
  // }


  // soundGanar(){
  //   const sonido = new Audio('../../assets/tralalero-tralala'); // Ruta del archivo de audio
  //   sonido.play().catch(error => console.error("Error al reproducir el sonido:", error));
  // }

// FALLO (MUY alomejor solucionado): Por lo que veo cuando el número apostado es pequeño se suma dos vezes, se mutiplica, se suma y se vuelve a sumar
  ganancia(){
    this.ganancia_del_juego = this.apuestas * 2 
    console.log("tu GANANCIA ", this.ganancia_del_juego)
    let new_user = {
      email: this.user.email,
      // Problema en esta línea, pone => money: underfind
      money: this.ganancia_del_juego
    }

    this.http.post(`${this.host}/dinero`, new_user ).subscribe((response) => {
      console.log(response);
    });
    console.log(this.ganancia_del_juego)
    console.log(new_user)
  }

  perder(){

    console.log("Usuario cargado:", this.usuario_cargado);
    console.log("Dinero actual:", this.usuario_cargado[0]?.dinero);

    let dinero_perdido = this.usuario_cargado[0]?.dinero + this.apuestas

    let new_user = {
      email: this.user.email,
      // Problema en esta línea, pone => money: underfind
      money: dinero_perdido
    }

    this.http.post(`${this.host}/perder`, new_user ).subscribe((response) => {
      console.log(response);
    });

    console.log(`respuesta ${response}`)
    console.log(`el dinero ahora es ${new_user.money}`)
    console.log("Datos enviados al backend:", new_user);
  }


  async empezar() {
    console.log(' El dinero que tienes ', this.money)


    console.log(`repartiendo primeras manos`)
    this.repartirCarta(this.mano_croupier)
    this.repartirCarta(this.mano_croupier)

    this.repartirCarta(this.mano_jugador)
    this.repartirCarta(this.mano_jugador)
    this.pri_empezar = false


    // Alert que no se usa, almenos por ahora
  //   const alert = await this.alertController.create({
  //     header: 'APUESTE AHORA',
  //     subHeader: 'Si tiene que apostar porfavor',
  //     message: 'Si tiene que apostar porfavor apueste ahora, grácias.',
  //     buttons: ['Okay']
  //   });

  //  await alert.present();

  }

  repartirCarta(baraja_destino: any[]){
    console.log("repartir carta")
    let random = Math.floor(Math.random() * this.baraja_principal.length)
// 1. añadir a la baraja destino
console.log("carta repartida")
console.log(this.baraja_principal[random])
baraja_destino.push(this.baraja_principal[random])
// 2. eliminar de baraja principal
this.baraja_principal.splice(random, 1);

console.log("Baraja jugador", this.mano_jugador)

  }


  pedir(){
    if(this.mano_jugador.length < 5){
    this.repartirCarta(this.mano_jugador)
    console.log(this.mano_jugador)

    console.log(this.mano_jugador.length)
    // this.suamrMano(this.mano_jugador, "jugador", false)
  }
  }


  parar(){
    // Mostrar la carta tapada
    this.parar_de_pedir = false
    // Sumar valor de la mano Jugador
    console.log(`el valor de la mano jugador antes de parar ${this.suma_mano_jugador}`)
    this.suma_mano_jugador = this.suamrMano(this.mano_jugador, "jugador", false)
        
    console.log("suma de la mano de jugador = ", this.suma_mano_jugador)

    if(this.suma_mano_jugador <= 21){
      //this.repartirCarta(this.mano_croupier)
        this.juegoCroupier()
      } else if (this.suma_mano_jugador > 21){
        console.log("pierde jugador")
        this.has_perdido = true
        this.perder()
      }
      

    }   
  
    juegoCroupier(){
      
      // Sumar valor de la mano Croupier
      console.log("juego croupier")
      this.suma_mano_croupier = this.suamrMano(this.mano_croupier, "croupier", false)

      console.log("mano croupier 1", this.suma_mano_croupier)

      // Aquí si el número de las cartas de croupier es menos de 17, se envia otra carta a la array del croupier
      // Aquí va un while
      while (this.suma_mano_croupier < 17) {
        console.log("SE ESTA EJECUTANDO EL WHILE DE REPARTIR CROUPIER");
        console.log("antes de repartir", this.mano_croupier);
        this.repartirCarta(this.mano_croupier);
        console.log("después de repartir", this.mano_croupier);
        this.suma_mano_croupier = this.suamrMano(this.mano_croupier, "croupier", false);
    }

      console.log(`suma mano JUGADOR = ${this.suma_mano_jugador}`)
      console.log(`suma mano CROUPIER = ${this.suma_mano_croupier}`)


      if (this.suma_mano_croupier > 21){
        console.log("Gana Jugador")
        this.has_ganado = true
        // this.money = this.dinero * 2
        this.ganancia()
      } else if(this.suma_mano_jugador > this.suma_mano_croupier){
        console.log("Gana Jugador")
        this.has_ganado = true
        // this.money = this.dinero * 2 + this.money
        this.ganancia()
      } else if (this.suma_mano_jugador < this.suma_mano_croupier){
        console.log("Pierde Jugador")
        this.has_perdido = true
        this.perder()
      }  else if (this.suma_mano_jugador == this.suma_mano_croupier){
        console.log("Habeis empatado, Pierde Jugador")
        this.has_perdido = true
        this.perder()
      } 

      console.log("mano croupier 2")
      console.log(this.suma_mano_croupier)
      console.log("mano croupier", this.mano_croupier)
    }

    suamrMano(mano: any, turno: string, repeticion: boolean): any{
      let suma = 0
      let as:boolean = false
      for(let carta of mano){
        as = carta.valor == 11 ? true : false;
        if(this.el_croupier_pasado == true || this.el_jugador_pasado == true){
          if(carta.valor == 11){
            suma = Number(1) + Number(suma)
            console.log("la suma con el as recalculado a = ", suma)
          } else {
            suma = Number(carta.valor) + Number(suma)
            console.log("la suma es SIN as", suma)
          }
        } else {
          suma = Number(carta.valor) + Number(suma)
          console.log("suma normal = ", suma)
        }
        console.log("valor carta", carta.valor)
      }

      if(suma > 21 && as == true && repeticion == false){
       if(turno == "croupier") {
        this.el_croupier_pasado = true
        return this.suamrMano(this.mano_croupier, "croupier", true)
       } else {
        this.el_jugador_pasado = true
        return this.suamrMano(this.mano_jugador, "jugador", true)
       }
      } else{
        console.log(`FIN SUMA MANO de ${turno} valor mano ${suma} la repeticion esta ${repeticion} VARIABLE as = ${as}`)
        return suma
      }
    }



    reload(){
      location.reload()
    }
}



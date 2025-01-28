import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {baraja} from '../../assets/baraja';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.page.html',
  styleUrls: ['./black-jack.page.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule, IonicModule, FormsModule]
})
export class BlackJackPage implements OnInit {

  public vic!: number
  public der!: number

  public dinero!: any;
  public money: number = 1000

  public apuestas: number = this.dinero

  public apuesta: boolean = true
  public pri_empezar: boolean = true
  public parar_de_pedir: boolean = true

  public suma_mano_jugador: number = 0

  public baraja_principal: any = []

  public mano_croupier: any = [
  ]

  public mano_jugador: any = [
  ]

  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.dinero = this.route.snapshot.params
    console.log(this.dinero)
    console.log(baraja)
    this.baraja_principal = baraja
  }

  enviarDinero() {

    if (this.apuesta == true){
    console.log(this.dinero)
    this.money = this.money - this.dinero
    this.apuesta = false

  } if (this.apuesta == false) {

  }
  }


  empezar() {
    console.log(`repartiendo primeras manos`)
    this.repartirCarta(this.mano_croupier)

    this.repartirCarta(this.mano_jugador)
    this.repartirCarta(this.mano_jugador)
    this.pri_empezar = false
  }

  repartirCarta(baraja_destino: any[]){
    let random = Math.floor(Math.random() * this.baraja_principal.length)
    console.log(random)
// 1. añadir a la baraja destino
console.log(this.baraja_principal[random])
baraja_destino.push(this.baraja_principal[random])
// 2. eliminar de baraja principal
this.baraja_principal.splice(random, 1);

console.log(this.mano_jugador)

  }


  pedir(){
    if(this.mano_jugador.length < 5){
    this.repartirCarta(this.mano_jugador)
    console.log(this.mano_jugador)

    console.log(this.mano_jugador.length)
  }
  }


  parar(){
// Sumar valor de la mano Jugador
        for(let carta of this.mano_jugador){
          this.suma_mano_jugador = Number(carta.valor) + Number(this.suma_mano_jugador)
        }

        console.log(this.suma_mano_jugador)
      
    if(this.mano_jugador <= 21){
    this.repartirCarta(this.mano_croupier)

      console.log("pierde jugador")
      }
      this.parar_de_pedir = false
    }   
  

}

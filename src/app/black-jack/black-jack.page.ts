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
  public suma_mano_croupier: number = 0

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
    this.repartirCarta(this.mano_croupier)

    this.repartirCarta(this.mano_jugador)
    this.repartirCarta(this.mano_jugador)
    this.pri_empezar = false
  }

  repartirCarta(baraja_destino: any[]){
    console.log("repartir carta")
    let random = Math.floor(Math.random() * this.baraja_principal.length)
    console.log(random)
// 1. añadir a la baraja destino
console.log("carta repartida")
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
    // Mostrar la carta tapada
    this.parar_de_pedir = false
    // Sumar valor de la mano Jugador
    this.suma_mano_jugador = this.suamrMano(this.mano_jugador)
        
    console.log("suma de la mano de jugador = ", this.suma_mano_jugador)

    if(this.suma_mano_jugador < 21){
      //this.repartirCarta(this.mano_croupier)
        this.juegoCroupier()
      
      } else if (this.suma_mano_jugador > this.suma_mano_croupier){
        this.juegoCroupier()
      } else{
        console.log("pierde jugador")
      }
      

    }   
  
    juegoCroupier(){
      
      // Sumar valor de la mano Croupier
      console.log("juego croupier")
      this.suma_mano_croupier = this.suamrMano(this.mano_croupier)
      
      console.log("mano croupier 1", this.suma_mano_croupier)

      // EL PROBLEMA NO ES EL "IF" SINO QUE NO FUNCIONA LA LOGICA DE DENTRO
      if(this.suma_mano_croupier < 17){
        console.log("antes de repartir", this.mano_croupier)
        this.repartirCarta(this.mano_croupier)
        console.log("después de repartir", this.mano_croupier)
        this.suma_mano_croupier = this.suamrMano(this.mano_croupier)
        
      }
      console.log("mano croupier 2")
      console.log(this.suma_mano_croupier)
      console.log("mano croupier", this.mano_croupier)
    }

    suamrMano(mano: any){
      let suma = 0
      for(let carta of mano){
        suma = Number(carta.valor) + Number(suma)
      }
      return suma
    }
    

}

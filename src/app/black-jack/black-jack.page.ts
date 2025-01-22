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
    
    this.repartirCarta(this.mano_croupier)

    this.repartirCarta(this.mano_jugador)
    this.repartirCarta(this.mano_jugador)
    
  }

  repartirCarta(baraja_destino: any[]){
    let random = Math.floor(Math.random() * this.baraja_principal.length)
    console.log(random)
// 1. añadir a la baraja destino
console.log(this.baraja_principal[random])
baraja_destino.push(this.baraja_principal[random])
// 2. eliminar de baraja principal
this.baraja_principal.splice(random, 1);

console.log(`mano de ${baraja_destino}`)

  }


  pedir(){
    


  }

}

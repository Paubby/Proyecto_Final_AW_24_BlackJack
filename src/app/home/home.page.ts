import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient } from "@angular/common/http"
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {



  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  irAlJuego(){
    this.router.navigate(['/black-jack']);
  }


}

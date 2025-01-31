import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/home'
      }
    });
  }


  logout(){
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin 
      }
    });
  }
}

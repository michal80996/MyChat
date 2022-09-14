import { Component } from '@angular/core';
import { AuthService } from './servises/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NG-Chat';

  
  constructor(private authServ:AuthService) {
  }

  public signInWithGoogle(){
    this.authServ.signInWithGoogle();
  }
}

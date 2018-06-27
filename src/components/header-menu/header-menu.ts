import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { SessionService } from '../../providers/session-service/session-service';

/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {
  username: string;

  constructor(
    public events: Events,
    private session: SessionService
  ) { 
    this.username = this.session.getUser()
   }

  goToLogin() {
    this.events.publish('user:login')
  }
  
  goToSignup() {
    this.events.publish('user:signup')
  }
    
  goToCalc() {
    this.events.publish('plus:calc')
  }
    
}

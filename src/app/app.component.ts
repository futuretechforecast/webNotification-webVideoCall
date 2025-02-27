import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getToken().then(token => {
      if (token) {
        console.log('Received Token:', token);
      } else {
        console.log('Failed to get FCM token.');
      }
    });

    this.firebaseService.receiveMessage();
  }

}

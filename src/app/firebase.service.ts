import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  messaging: any;

  constructor() {
    if (typeof window !== 'undefined') {  
      const firebaseApp = initializeApp(environment.firebase);
      this.messaging = getMessaging(firebaseApp);
    }
  }

  async getToken(): Promise<string | null> {
    if (!this.messaging) return null;

    try {
      const token = await getToken(this.messaging, {
        vapidKey: 'BJWfgyEZk5CQy9yObqZLpLdGCZjoW_sbt-ZjWxYAy7qTPKloCJXGAxTzGWkBaJLq0gqdjm2YEOwsmV6fbJf3q6w'
      });

      if (token) {        
        return token;
      } else {
        console.log('No FCM token available.');
        return null; 
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }


  receiveMessage() {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
    });
  }
}



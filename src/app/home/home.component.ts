import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent {

  showOptions = false;

  constructor(private router:Router){}
 
  toggleCallOptions() {
    this.showOptions = !this.showOptions;
  }

  startAudioCall() {
    this.router.navigate(['video'])
    alert("Starting Audio Call...");
    // Implement actual audio call logic here
  }

  startVideoCall() {    
    this.router.navigate(['video-call'])
  }

}

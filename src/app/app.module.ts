import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PlansComponent } from './plans/plans.component';
import { StoriesComponent } from './stories/stories.component';
import { ContactComponent } from './contact/contact.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { AudioCallComponent } from './audio-call/audio-call.component';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './firebase.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PlansComponent,
    StoriesComponent,
    ContactComponent,
    VideoCallComponent,
    AudioCallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [FirebaseService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

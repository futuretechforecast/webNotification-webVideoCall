import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PlansComponent } from './plans/plans.component';
import { StoriesComponent } from './stories/stories.component';
import { ContactComponent } from './contact/contact.component';
import { VideoCallComponent } from './video-call/video-call.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'stories', component: StoriesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'video-call', component: VideoCallComponent },
  { path: '**', redirectTo: 'home' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

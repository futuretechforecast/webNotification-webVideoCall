import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.scss'],
    standalone: false
})
export class VideoCallComponent implements AfterViewInit {
  @ViewChild('root') root!: ElementRef;

  private startTime: number = 0;
  private zp: any;
  roomID: string = '123';

  constructor(@Inject(PLATFORM_ID) private platformId: any, private api: ApiService) { }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');

      const appId = 2066693960;
      const serverSecret = '2c4df305565cb5b8e8a52c925df9dfd2';

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        this.roomID,
        Date.now().toString(),
        Date.now().toString()
      );

      this.zp = ZegoUIKitPrebuilt.create(kitToken);
      this.startTime = Date.now();

      this.zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + this.roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        onLeaveRoom: () => {
          this.saveCallHistory();
        }
      });
    }
  }

  private saveCallHistory() {
    const durationSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    let durationFormatted: string;
    if (durationSeconds < 60) {
      durationFormatted = `${durationSeconds} s`; 
    } else if (durationSeconds < 3600) {
      durationFormatted = `${Math.floor(durationSeconds / 60)} min`;
    } else {
      durationFormatted = `${Math.floor(durationSeconds / 3600)} h`; 
    }

    const callData = {
      roomID: this.roomID,
      userID: localStorage.getItem('userId') ?? 'unknownUser',
      duration: durationFormatted,
      timestamp: new Date().toISOString(),
    };

    this.api.postCallHistory(callData).subscribe({
      next: (res: any) => console.log('Call history saved successfully', res),
      error: (err: any) => console.error('Error saving call history', err),
    });
  }

}


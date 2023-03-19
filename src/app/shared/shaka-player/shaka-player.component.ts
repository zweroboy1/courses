import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

declare let shaka: any;
@Component({
  selector: 'app-shaka-player',
  templateUrl: './shaka-player.component.html',
  styleUrls: ['./shaka-player.component.scss'],
})
export class ShakaPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoElementRef: ElementRef | undefined;
  @ViewChild('videoContainer') videoContainerRef: ElementRef | undefined;

  videoElement: HTMLVideoElement | undefined;
  videoContainerElement: HTMLDivElement | undefined;
  player: any;

  constructor(private platform: Platform) { }

  ngAfterViewInit(): void {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.videoElement = this.videoElementRef?.nativeElement;
      this.videoContainerElement = this.videoContainerRef?.nativeElement;
      this.initPlayer();
    } else {
      console.error('Browser not supported!');
    }
  }

  private initPlayer() {

    shaka.media.ManifestParser.registerParserByExtension("m3u8", shaka.hls.HlsParser);
    shaka.media.ManifestParser.registerParserByMime("Application/vnd.apple.mpegurl", shaka.hls.HlsParser);
    shaka.media.ManifestParser.registerParserByMime("application/x-mpegURL", shaka.hls.HlsParser);


    this.player = new shaka.Player(this.videoElement);

    const ui = new shaka.ui.Overlay(
      this.player,
      this.videoContainerElement,
      this.videoElement
    );


    let videoUrl = "http://amssamples.streaming.mediaservices.windows.net/bc57e088-27ec-44e0-ac20-a85ccbcd50da/TearsOfSteel.ism/manifest(format=mpd-time-csf)";
    videoUrl = "https://wisey.app/videos/toxic-people/preview/AppleHLS1/preview.m3u8";
    if (this.platform.SAFARI) {
      videoUrl = "https://wisey.app/videos/toxic-people/preview/AppleHLS1/preview.m3u8";
    }
    this.player
      .load(videoUrl)
      .then(() => {
        const textTracks = this.player.getTextTracks();
        if (textTracks.length > 0) {
          this.player.setTextTrackVisibility(true);
          this.player.selectTextTrack(textTracks[0]);
        }
        this.videoElement?.play();
      })
      .catch((e: any) => {
        console.error(e);
      });
  }
}
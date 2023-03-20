import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesApiService } from '../../core/services/courses-api.service';
import { tap, take } from 'rxjs/operators';

interface Course {
  title?: string;
  description?: string;
  photo?: string;
  video?: string
  lessonsCount?: number;
  tags?: Array<string>,
  rating?: number;
}

interface Lesson {
  id: string;
  order: number;
  title: string;
  video: string;
  img: string;
  status: string;
}

declare let shaka: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoElementRef: ElementRef | undefined;
  @ViewChild('videoContainer') videoContainerRef: ElementRef | undefined;
  public course: Course = {};
  public lessons: Array<Lesson> = [];
  public active: Array<boolean> = [];
  videoElement: HTMLVideoElement | undefined;
  videoContainerElement: HTMLDivElement | undefined;
  player: any;

  constructor(
    private coursesApiService: CoursesApiService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.getCourse(id);
  }

  getCourse(id: string): void {
    this.coursesApiService.getCourse(id).pipe(
      tap((data) => {
        this.course = data;
        this.course.video = data.meta.courseVideoPreview.link;
        this.course.lessonsCount = data.lessons.length;
        this.active = Array(data.lessons.length).fill(false);
        this.initPlayer(this.course.video);
        this.createLessonsLayout(data.lessons);
      }),
      take(1)
    ).subscribe();
  }

  createLessonsLayout(lessons: Array<any>): void {
    this.lessons = lessons.map((lesson) => {
      return {
        id: lesson.id,
        order: lesson.order,
        title: lesson.title,
        video: lesson.link,
        img: lesson.previewImageLink + '/lesson-' + lesson.order + '.webp',
        status: lesson.status
      }
    });
  }

  ngAfterViewInit(): void {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.videoElement = this.videoElementRef?.nativeElement;
      this.videoContainerElement = this.videoContainerRef?.nativeElement;

    } else {
      console.error('Browser not supported!');
    }
  }

  private initPlayer(url: string | undefined) {

    shaka.media.ManifestParser.registerParserByExtension("m3u8", shaka.hls.HlsParser);
    shaka.media.ManifestParser.registerParserByMime("Application/vnd.apple.mpegurl", shaka.hls.HlsParser);
    shaka.media.ManifestParser.registerParserByMime("application/x-mpegURL", shaka.hls.HlsParser);

    this.player = new shaka.Player(this.videoElement);

    const ui = new shaka.ui.Overlay(
      this.player,
      this.videoContainerElement,
      this.videoElement
    );

    this.loadVideo(url);
  }

  loadVideo(url: string | undefined): void {
    this.player
      .load(url, 0)
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


  view(id: string) {
    let currentLesson = this.lessons.filter((lesson) => lesson.id === id)[0];
    this.loadVideo(currentLesson.video);
    this.active.fill(false);
    window.scroll(200, 200);
    this.active[currentLesson.order - 1] = true;
  }

}

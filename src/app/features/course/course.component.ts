import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  public course: Course = {};

  constructor(
    private coursesApiService: CoursesApiService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.getCourse(id);
  }

  getCourse(id: string) {
    this.coursesApiService.getCourse(id).pipe(
      tap((data) => {
        console.log(data);
        this.course = data;
        this.course.video = data.meta.courseVideoPreview.link;
      }),
      take(1)
    ).subscribe();
  }
}

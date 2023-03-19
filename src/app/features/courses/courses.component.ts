import { Component, OnInit } from '@angular/core';
import { CoursesApiService } from 'src/app/core/services/courses-api.service';
import { tap, take } from 'rxjs/operators';


interface Course {
  hash: string;
  title: string;
  photo: string;
  lessonsCount: number;
  tags: Array<string>,
  rating: number;
}


let COURSES: Array<Course> = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  page = 1;
  pageSize = 10;
  collectionSize: number = 0;

  public courses: Array<Course> = [];
  constructor(private coursesApiService: CoursesApiService) {

  }

  refreshCourses(): void {
    this.courses = COURSES.map((course, i) => ({ id: i + 1, ...course })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  getCourses() {
    this.coursesApiService.getCourses().pipe(

      tap((data) => {
        COURSES = data.courses.map((element: any) => {
          return {
            title: element.title,
            hash: element.id,
            photo: element.previewImageLink + '/cover.webp',
            lessonsCount: element.lessonsCount,
            tags: element.meta.skills,
            rating: element.rating
          }
        });
        this.collectionSize = COURSES.length;
        this.refreshCourses();
      }),
      take(1)
    ).subscribe();
  }

  ngOnInit(): void {
    this.getCourses();
  }
}

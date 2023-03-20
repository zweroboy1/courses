import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from "../course/course.component";
import { CoursesRoutingModule } from './courses-routing.module';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CoursesComponent, CourseComponent
  ],
  imports: [
    CommonModule, NgbPaginationModule, NgbTypeaheadModule
  ],
  exports: [
    CoursesComponent, CourseComponent, CoursesRoutingModule, NgbPaginationModule, NgbTypeaheadModule
  ]

})
export class CoursesModule { }

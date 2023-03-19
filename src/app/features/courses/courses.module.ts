import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from "../course/course.component";
import { ShakaPlayerComponent } from "../../shared/shaka-player/shaka-player.component";
import { CoursesRoutingModule } from './courses-routing.module';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CoursesComponent, CourseComponent, ShakaPlayerComponent
  ],
  imports: [
    CommonModule, NgbPaginationModule, NgbTypeaheadModule
  ],
  exports: [
    CoursesComponent, CourseComponent, CoursesRoutingModule, NgbPaginationModule, NgbTypeaheadModule, ShakaPlayerComponent
  ]

})
export class CoursesModule { }

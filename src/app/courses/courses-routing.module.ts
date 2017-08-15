import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CreateCourseComponent } from './course/create/create-course.component';
//import { EditBuildingComponent } from './building/edit/edit-building.component';

const url = 'courses';

export const ROUTES: Routes = [
  {
    path: url,
    component: CoursesComponent
  },
  {
    path: url + '/show/:id',
    component: CourseComponent
  },
  {
    path: url + '/new',
    component: CreateCourseComponent
  }/*,
  {
    path: url + '/edit/:id',
    component: EditBuildingComponent
  }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})

export class CoursesRoutingComponent {
  public routes = ROUTES;
}

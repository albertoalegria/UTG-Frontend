import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectsComponent } from './subjects.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './subject/create/create-subject.component';
import { EditSubjectComponent } from './subject/edit/edit-subject.component';

const url = 'subjects';

export const ROUTES: Routes = [
  {
    path: url,
    component: SubjectsComponent
  },
  {
    path: url + '/show/:id',
    component: SubjectComponent
  },
  {
    path: url + '/new',
    component: CreateSubjectComponent
  },
  {
    path: url + '/edit/:id',
    component: EditSubjectComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})

export class SubjectsRoutingModule {
  public routes = ROUTES;
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurriculaComponent } from './curricula.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CreateCurriculumComponent } from './curriculum/create/create-curriculum.component';
import { EditCurriculumComponent } from './curriculum/edit/edit-curriculum.component';

const url = 'curricula';

export const ROUTES: Routes = [
  {
    path: url,
    component: CurriculaComponent
  },
  {
    path: url + '/show/:id',
    component: CurriculumComponent
  },
  {
    path: url + '/new',
    component: CreateCurriculumComponent
  },
  {
    path: url + '/edit/:id',
    component: EditCurriculumComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [RouterModule]
})

export class CurriculaRoutingModule {
  public routes = ROUTES;
}

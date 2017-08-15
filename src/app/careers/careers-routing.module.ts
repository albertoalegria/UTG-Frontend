import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CareersComponent } from './careers.component';
import { CareerComponent } from './career/career.component';
import { CreateCareerComponent } from './career/create/create-career.component';
import { EditCareerComponent } from './career/edit/edit-career.component';

const url = 'careers';

export const ROUTES: Routes = [
  {
    path: url,
    component: CareersComponent
  },
  {
    path: url + '/show/:id',
    component: CareerComponent
  },
  {
    path: url + '/new',
    component: CreateCareerComponent
  },
  {
    path: url + '/edit/:id',
    component: EditCareerComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [RouterModule]
})

export class CareersRoutingModule {
  public routes = ROUTES;
}

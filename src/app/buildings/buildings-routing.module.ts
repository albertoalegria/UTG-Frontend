import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildingsComponent } from './buildings.component';
import { BuildingComponent } from './building/building.component';
import { CreateBuildingComponent } from './building/create/create-building.component';
import { EditBuildingComponent } from './building/edit/edit-building.component';

const url = 'buildings';

export const ROUTES: Routes = [
  {
    path: url,
    component: BuildingsComponent
  },
  {
    path: url + '/show/:id',
    component: BuildingComponent
  },
  {
    path: url + '/new',
    component: CreateBuildingComponent
  },
  {
    path: url + '/edit/:id',
    component: EditBuildingComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})

export class BuildingsRoutingModule {
  public routes = ROUTES;
}

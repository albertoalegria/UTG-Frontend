import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/create/create-group.component';
import { EditGroupComponent } from './group/edit/edit-group.component';

const url = 'groups';

export const ROUTES: Routes = [
  {
    path: url,
    component: GroupsComponent
  },
  {
    path: url + '/show/:id',
    component: GroupComponent
  },
  {
    path: url + '/new',
    component: CreateGroupComponent
  },
  {
    path: url + '/edit/:id',
    component: EditGroupComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})

export class GroupsRoutingModule {
  public routes = ROUTES;
}

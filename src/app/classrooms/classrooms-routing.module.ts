import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassroomsComponent } from './classrooms.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { CreateClassroomComponent } from './classroom/create/create-classroom.component';
import { EditClassroomComponent } from './classroom/edit/edit-classroom.component';

const url = 'classrooms';

export const ROUTES: Routes = [
    {
        path: url,
        component: ClassroomsComponent
    },
    {
        path: url + '/show/:id',
        component: ClassroomComponent
    },
    {
        path: url + '/new',
        component: CreateClassroomComponent
    },
    {
        path: url + '/edit/:id',
        component: EditClassroomComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ]
})

export class ClassroomsRoutingModule {
}
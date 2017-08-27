import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeachersComponent } from './teachers.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CreateTeacherComponent } from './teacher/create/create-teacher.component';

const url = 'teachers';

export const ROUTES: Routes = [
    {
        path: url,
        component: TeachersComponent
    },
    {
        path: url + '/show/:id',
        component: TeacherComponent
    },
    {
        path: url + '/new',
        component: CreateTeacherComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES) ],
    exports: [ RouterModule ]
})

export class TeachersRoutingModule {
    public routes = ROUTES;
}
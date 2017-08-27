import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';

import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingComponent } from './buildings/building/building.component';
import { CreateBuildingComponent } from './buildings/building/create/create-building.component';
import { EditBuildingComponent } from './buildings/building/edit/edit-building.component';

import { CareersComponent } from './careers/careers.component';
import { CareerComponent } from './careers/career/career.component';
import { CreateCareerComponent } from './careers/career/create/create-career.component';
import { EditCareerComponent } from './careers/career/edit/edit-career.component';

import { CurriculaComponent } from './curricula/curricula.component';
import { CurriculumComponent } from './curricula/curriculum/curriculum.component';
import { CreateCurriculumComponent } from './curricula/curriculum/create/create-curriculum.component';
import { EditCurriculumComponent } from './curricula/curriculum/edit/edit-curriculum.component';

import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { CreateSubjectComponent } from './subjects/subject/create/create-subject.component';
import { EditSubjectComponent } from './subjects/subject/edit/edit-subject.component';

import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group/group.component';
import { CreateGroupComponent } from './groups/group/create/create-group.component';
import { EditGroupComponent } from './groups/group/edit/edit-group.component';

import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ClassroomComponent } from './classrooms/classroom/classroom.component';
import { CreateClassroomComponent } from './classrooms/classroom/create/create-classroom.component';
import { EditClassroomComponent } from './classrooms/classroom/edit/edit-classroom.component';

import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { CreateCourseComponent } from './courses/course/create/create-course.component';
import { EditCourseComponent } from './courses/course/edit/edit-course.component';

import { TeachersComponent } from './teachers/teachers.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { CreateTeacherComponent } from './teachers/teacher/create/create-teacher.component';

import { DeleteConfirmationComponent } from './delete-confirmation.component';

import { UtilsService } from './utils/utils.service';

import { BuildingService } from './buildings/shared/building.service';
import { CareerService } from './careers/shared/career.service';
import { CurriculumService } from './curricula/shared/curriculum.service';
import { SubjectService } from './subjects/shared/subject.service';
import { GroupService } from './groups/shared/group.service';
import { ClassroomService } from './classrooms/shared/classroom.service';
import { CourseService } from './courses/shared/course.service';
import { TeacherService } from './teachers/shared/teacher.service';

import { BuildingsRoutingModule } from './buildings/buildings-routing.module';
import { CareersRoutingModule } from './careers/careers-routing.module';
import { CurriculaRoutingModule } from './curricula/curricula-routing.module';
import { SubjectsRoutingModule } from './subjects/subjects-routing.module';
import { GroupsRoutingModule } from './groups/groups-routing.module';
import { ClassroomsRoutingModule } from './classrooms/classrooms-routing.module';
import { CoursesRoutingComponent } from './courses/courses-routing.module';
import { TeachersRoutingModule } from './teachers/teachers-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    BuildingComponent,
    CreateBuildingComponent,
    EditBuildingComponent,
    CareersComponent,
    CareerComponent,
    CreateCareerComponent,
    EditCareerComponent,
    CurriculaComponent,
    CurriculumComponent,
    CreateCurriculumComponent,
    EditCurriculumComponent,
    SubjectsComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EditSubjectComponent,
    GroupsComponent,
    GroupComponent,
    CreateGroupComponent,
    EditGroupComponent,
    ClassroomsComponent,
    ClassroomComponent,
    CreateClassroomComponent,
    EditClassroomComponent,
    CoursesComponent,
    CourseComponent,
    CreateCourseComponent,
    EditCourseComponent,
    TeachersComponent,
    TeacherComponent,
    CreateTeacherComponent,
    DeleteConfirmationComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BuildingsRoutingModule,
    CareersRoutingModule,
    CurriculaRoutingModule,
    SubjectsRoutingModule,
    GroupsRoutingModule,
    ClassroomsRoutingModule,
    CoursesRoutingComponent,
    TeachersRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    JsonpModule
  ],
  providers: [ BuildingService, CareerService, CurriculumService, SubjectService, UtilsService, GroupService, ClassroomService, CourseService, TeacherService ],
  entryComponents: [ DeleteConfirmationComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

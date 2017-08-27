import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../shared/course.model';
import { CourseService } from '../../shared/course.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';
import { Curriculum } from '../../../curricula/shared/curriculum.model';
import { CurriculumService } from '../../../curricula/shared/curriculum.service';
import { Group } from '../../../groups/shared/group.model';
import { GroupService } from '../../../groups/shared/group.service';
import { Subject } from '../../../subjects/shared/subject.model';
import { SubjectService } from '../../../subjects/shared/subject.service';
import { Building } from '../../../buildings/shared/building.model';
import { BuildingService } from '../../../buildings/shared/building.service';
import { Classroom } from '../../../classrooms/shared/classroom.model';
import { ClassroomService } from '../../../classrooms/shared/classroom.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit-course',
  templateUrl: 'edit-course.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class EditCourseComponent implements OnInit {
  course: Course;
  help = false;
  needsLabs = false;
  career: Career;
  curriculum: Curriculum;
  group: Group;
  subject: Subject;
  building: Building;
  building2: Building;
  careers: Career[];
  curricula: Curriculum[];
  groups: Group[];
  subjects: Subject[];
  buildings: Building[];
  classrooms: Classroom[];
  labClassrooms: Classroom[];
  classrooms1: Classroom[];
  classrooms2: Classroom[];  
  buildingsHolder: BuildingsHolder[];   //KILL
  buildingsHolder2: BuildingsHolder[];  //ME!!

  constructor(
    private courseService: CourseService,
    private careerService: CareerService,
    private curriculumService: CurriculumService,
    private groupService: GroupService,
    private subjectService: SubjectService,
    private buildingService: BuildingService,
    private classroomService: ClassroomService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) => this.courseService.get(+params['id'])).subscribe(course => this.course = course);
    this.buildingsHolder = [];
    this.buildingsHolder2 = [];

    this.careerService.getAll().subscribe(careers => this.careers = careers);
  }

  onSubmit(course: Course): void {
    course.id = this.course.id;

    if(this.needsLabs) {
      course.classrooms = this.classrooms1.concat(this.classrooms2);
    } else {
      course.classrooms = this.classrooms1;
    }

    this.courseService.update(course).subscribe(data => {
      this.location.back();
    });
  }

  updateCurricula(): void {
    this.curriculumService.getByCareer(this.career.id).subscribe(curricula => this.curricula = curricula);
  }

  updateGroups(): void {
    this.groupService.getByCurriculum(this.curriculum.id).subscribe(groups => this.groups = groups);
  }

  updateSubjects(): void {
    this.subjectService.getByCurriculumAndSemester(this.curriculum.id, this.group.semester).subscribe(subjects => this.subjects = subjects);
  }

  updateClassrooms(): void {

    this.needsLabs = this.subject.laboratoryHours > 0;

    if (!this.needsLabs) {
      this.buildingService.getAll().subscribe(x => {
        this.buildings = x;
        this.buildings.forEach(y => {
          let b: BuildingsHolder = new BuildingsHolder();
          b.building = y;
          this.classroomService.getByBuildingAndType(y.id, this.subject.type).subscribe(z => {
            b.classrooms = z;
            this.buildingsHolder.push(b);
          });
        });
      });
    } else {
      this.buildingService.getAll().subscribe(x => {
        this.buildings = x;
        this.buildings.forEach(y => {
          let b: BuildingsHolder = new BuildingsHolder();
          b.building = y;
          this.classroomService.getByBuildingAndType2(y.id, this.subject.type).subscribe(z => {
            b.classrooms = z;
            this.buildingsHolder.push(b);
          });
        });
      });

      this.buildingService.getAll().subscribe(x => {
        this.buildings = x;
        this.buildings.forEach(y => {
          let b: BuildingsHolder = new BuildingsHolder();
          b.building = y;
          this.classroomService.getByBuildingAndType(y.id, this.subject.type).subscribe(z => {
            b.classrooms = z;
            this.buildingsHolder2.push(b);
          });
        });
      });
    }
  }

  disableHelp() {
    this.help = !this.help;
  }
}

class BuildingsHolder {
  building: Building;
  classrooms: Classroom[];
}
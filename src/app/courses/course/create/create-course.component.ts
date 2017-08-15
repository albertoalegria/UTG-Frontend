import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { Course } from '../../shared/course.model';
import { CourseService } from  '../../shared/course.service';
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
//import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateCourseComponent implements OnInit {
  help = false;
  career: Career;
  curriculum: Curriculum;
  group: Group;
  building: Building;
  careers: Career[];
  curricula: Curriculum[];
  groups: Group[];
  subjects: Subject[];
  buildings: Building[];
  classrooms: Classroom[];

  constructor(
    private courseService: CourseService,
    private careerService: CareerService,
    private curriculumService: CurriculumService,
    private groupService: GroupService,
    private subjectService: SubjectService,
    private buildingService: BuildingService,
    private classroomService: ClassroomService,
    //private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.careerService.getAll().subscribe(careers => this.careers = careers);
    this.buildingService.getAll().subscribe(buildings => this.buildings = buildings);
  }

  onSubmit(course: Course): void {
    console.log(course);
    this.courseService.create(course).subscribe(data => {
      this.router.navigate(['/buildings']);
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
    this.classroomService.getByBuilding(this.building.id).subscribe(classrooms => this.classrooms = classrooms);
  }
  
  disableHelp() {
    this.help = !this.help;
  }

}

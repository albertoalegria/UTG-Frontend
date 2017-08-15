import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from '../../shared/subject.model';
import { SubjectService } from '../../shared/subject.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';
import { Curriculum } from '../../../curricula/shared/curriculum.model';
import { CurriculumService } from '../../../curricula/shared/curriculum.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'create-subject',
  templateUrl: 'create-subject.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateSubjectComponent implements OnInit {
  laboratoryHours: number;
  curricula: Curriculum[];
  semesters: number[];
  careers: Career[];
  careerId: number;
  types: string[];
  hours: number;
  hidden = true;
  help = false;

  constructor(
    private careerService: CareerService,
    private utilsService: UtilsService,
    private subjectService: SubjectService,
    private curriculumService: CurriculumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.careerService.getAll().subscribe(careers => this.careers = careers);
    this.utilsService.getTypes().subscribe(types => this.types = types);
    this.utilsService.getSemesters().subscribe(semesters => this.semesters = semesters);
  }

  updateCurricula(): void {
    this.curriculumService.getByCareer(this.careerId).subscribe(curricula => this.curricula = curricula);
  }

  onSubmit(subject: Subject): void {
    if (this.hidden) {
      subject.type = "Classroom";
    } else {
      subject.type = "Laboratory";
    }

    console.log(subject);

    this.subjectService.create(subject).subscribe(data => {
      this.router.navigate(['/subjects']);
    });
  }

  hide() {
    this.hidden = !this.hidden;
  }

  disableHelp() {
    this.help = !this.help;
  }

  isValid(formStatus: boolean): boolean {
    if (this.laboratoryHours) {
      return !(formStatus && this.laboratoryHours < this.hours);
    }
    return !formStatus;
  }
}

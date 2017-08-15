import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdSelectModule } from '@angular/material';

import { Subject } from '../../shared/subject.model';
import { SubjectService } from '../../shared/subject.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';
import { Curriculum } from '../../../curricula/shared/curriculum.model';
import { CurriculumService } from '../../../curricula/shared/curriculum.service';
import { UtilsService } from '../../../utils/utils.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit-subject',
  templateUrl: 'edit-subject.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class EditSubjectComponent implements OnInit {
  laboratoryHours: number;
  curricula: Curriculum[];
  semesters: number[];
  careers: Career[];
  careerId: number;
  types: string[];
  hours: number;
  hidden = true;
  help = false;

  active = false;
  subject: Subject;

  constructor(
    private careerService: CareerService,
    private utilsService: UtilsService,
    private subjectService: SubjectService,
    private curriculumService: CurriculumService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) => this.subjectService.get(+params['id']))
                                                                  .subscribe(subject => {
                                                                    this.subject = subject;
                                                                    if (this.subject.laboratoryHours) {
                                                                      this.hidden = false;
                                                                      this.active = true;
                                                                      this.laboratoryHours = this.subject.laboratoryHours;
                                                                    }
                                                                    this.hours = this.subject.hours;
                                                                  });

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

    if (this.hidden) {
        subject.laboratoryHours = 0;
    }

    subject.id = this.subject.id;

    console.log(subject);

    this.subjectService.update(subject).subscribe(data => {
      this.location.back();
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

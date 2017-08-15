import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdSelectModule } from '@angular/material';

import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { Curriculum } from '../../../curricula/shared/curriculum.model';
import { CurriculumService } from '../../../curricula/shared/curriculum.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';
import { UtilsService } from '../../../utils/utils.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit-group',
  templateUrl: 'edit-group.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class EditGroupComponent implements OnInit {
  curricula: Curriculum[];
  careers: Career[];
  shifts: string[];
  semesters: number[];
  help = false;
  semester: number;
  curriculum: Curriculum;
  available = false;

  group: Group;
  selectedCareer: Career;
  selectedCurriculum: Curriculum;
  selectedShift: string;
  selectedSemester: number;
  //selectedCareer = curriculum.careerService
  //selectedCurriculum = curriculum
  //[(ngModel)]="selectedCareer"

  constructor(
    private utilsService: UtilsService,
    private groupService: GroupService,
    private curriculumService: CurriculumService,
    private careerService: CareerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) => this.groupService.get(+params['id']))
                                                            .subscribe(group => {
                                                              this.group = group;
                                                              this.selectedCurriculum = group.curriculum;
                                                              this.selectedCareer = group.curriculum.career;
                                                              this.selectedShift = group.shift;
                                                              this.selectedSemester = group.semester;

                                                              this.updateShifts();
                                                            });

    this.careerService.getAll().subscribe(careers => this.careers = careers);
    this.utilsService.getSemesters().subscribe(semesters => this.semesters = semesters);

  }

  onSubmit(group: Group): void {
    group.id = this.group.id;

    this.groupService.update(group).subscribe(data => {
      this.location.back();
    });
  }

  updateCurricula(): void {
    this.curriculumService.getByCareer(this.selectedCareer.id).subscribe(curricula => this.curricula = curricula);
    this.updateShifts();
  }

  updateShifts(): void {
    this.utilsService.getAvailableShifts(this.selectedCurriculum.id, this.selectedSemester).subscribe(shifts => {
      this.shifts = shifts;
      this.available = this.shifts.length > 0;

      if (!(this.shifts.indexOf(this.group.shift) > -1)) {
        this.shifts.push(this.group.shift);
      }

    });
  }

  disableHelp() {
    this.help = !this.help;
  }
}

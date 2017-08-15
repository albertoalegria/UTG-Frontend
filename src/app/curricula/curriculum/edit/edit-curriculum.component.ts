import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Curriculum } from '../../shared/curriculum.model';
import { CurriculumService } from '../../shared/curriculum.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit-career',
  templateUrl: 'edit-curriculum.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class EditCurriculumComponent implements OnInit {
  curriculum: Curriculum;
  careers: Career[];

  constructor(
    private curriculumService: CurriculumService,
    private careerService: CareerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) => this.curriculumService.get(+params['id']))
                                                        .subscribe(curriculum => this.curriculum = curriculum);

    this.careerService.getAll().subscribe(careers => this.careers = careers);
  }

  onSubmit(curriculum: Curriculum): void {
    this.curriculum.name = curriculum.name;
    this.curriculum.career = curriculum.career;

    this.curriculumService.update(this.curriculum).subscribe(data => {
      this.location.back();
    });
  }
}

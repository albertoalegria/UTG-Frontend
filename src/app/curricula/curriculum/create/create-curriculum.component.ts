import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Curriculum } from '../../shared/curriculum.model';
import { CurriculumService } from '../../shared/curriculum.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';

@Component({
  selector: 'create-curriculum',
  templateUrl: 'create-curriculum.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateCurriculumComponent implements OnInit {
  careers: Career[];

  constructor(
    private curriculumService: CurriculumService,
    private careerService: CareerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.careerService.getAll().subscribe(careers => this.careers = careers);
  }

  onSubmit(curriculum: Curriculum): void {
    this.curriculumService.create(curriculum).subscribe(data => {
      this.router.navigate(['/curricula']);
    });
  }
}

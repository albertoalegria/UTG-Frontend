import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Curriculum } from '../shared/curriculum.model';
import { CurriculumService } from '../shared/curriculum.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'curriculum',
  templateUrl: 'curriculum.component.html',
  styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class CurriculumComponent implements OnInit {
  curriculum: Curriculum;

  constructor(
    private curriculumService: CurriculumService,
    private activatedRoute: ActivatedRoute,
    public mdDialog: MdDialog,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) =>
                                this.curriculumService.get(+params['id']))
                                .subscribe(curriculum => this.curriculum = curriculum);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download?name=' + name;
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted curriculum with id ' + id);
        this.curriculumService.delete(id).subscribe(data => {
          this.router.navigate(['/curricula']);
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

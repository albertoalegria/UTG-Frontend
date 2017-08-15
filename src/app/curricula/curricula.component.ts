import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Curriculum } from './shared/curriculum.model';
import { CurriculumService } from './shared/curriculum.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
  selector: 'curricula',
  templateUrl: 'curricula.component.html',
  styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class CurriculaComponent implements OnInit {
  curricula: Curriculum[];

  constructor(
    private curriculumService: CurriculumService,
    private router: Router,
    private mdDialog: MdDialog
  ) {}

  ngOnInit(): void {
    this.curriculumService.getAll().subscribe(curricula => this.curricula = curricula);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download?name=' + name;
  }

  add(): void {
    this.router.navigate(['/curricula/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted curriculum with id ' + id);
        this.curriculumService.delete(id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Subject } from './shared/subject.model';
import { SubjectService } from './shared/subject.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
  selector: 'subjects',
  templateUrl: 'subjects.component.html',
  styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class SubjectsComponent implements OnInit {
  subjects: Subject[];

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private mdDialog: MdDialog
  ) {}

  ngOnInit(): void {
    this.subjectService.getAll().subscribe(subjects => this.subjects = subjects);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download/thumbs?name=' + name;
  }

  add(): void {
    this.router.navigate(['/subjects/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted subject with id ' + id);
        this.subjectService.delete(id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

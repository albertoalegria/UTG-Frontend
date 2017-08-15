import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Subject } from '../shared/subject.model';
import { SubjectService } from '../shared/subject.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'subject',
  templateUrl: 'subject.component.html',
  styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class SubjectComponent implements OnInit {
  subject: Subject;

  constructor(
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    public mdDialog: MdDialog,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) =>
                                this.subjectService.get(+params['id']))
                                .subscribe(subject => this.subject = subject);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download?name=' + name;
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted subject with id ' + id);
        this.subjectService.delete(id).subscribe(data => {
          this.router.navigate(['/subjects']);
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

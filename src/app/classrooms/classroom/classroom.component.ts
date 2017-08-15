import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Classroom } from '../shared/classroom.model';
import { ClassroomService } from '../shared/classroom.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'classroom',
    templateUrl: 'classroom.component.html',
    styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class ClassroomComponent implements OnInit {
    classroom: Classroom;
    
    constructor(
        private classroomService: ClassroomService,
        private activatedRoute: ActivatedRoute,
        public mdDialog: MdDialog,
        private location: Location,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.switchMap((params: Params) => this.classroomService
                                                                        .get(+params['id']))
                                                                        .subscribe(classroom => this.classroom = classroom);
    }

    getImageUrl(name: string): string {
        return 'http://localhost:8080/careers/download?name=' + name;
    }

    openConfirmationDialog(id: number): void {
        let dialog = this.mdDialog.open(DeleteConfirmationComponent);
    
        dialog.afterClosed().subscribe(result => {
          if (result == 'delete') {
            console.log('Deleted group with id ' + id);
            this.classroomService.delete(id).subscribe(data => {
              this.router.navigate(['/classrooms']);
            });
          }
        });
      }
    
      goBack(): void {
        this.location.back();
      }
}
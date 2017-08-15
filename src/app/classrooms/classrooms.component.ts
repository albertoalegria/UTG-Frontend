import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Classroom } from './shared/classroom.model';
import { ClassroomService } from './shared/classroom.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
    selector: 'classrooms',
    templateUrl: './classrooms.component.html',
    styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class ClassroomsComponent implements OnInit {
    classrooms: Classroom[];

    constructor(
        private classroomService: ClassroomService,
        private router: Router,
        public mdDialog: MdDialog
    ) {}

  ngOnInit(): void {
    this.getClassrooms();
  }

  getClassrooms(): void {
    this.classroomService.getAll().subscribe(classrooms => this.classrooms = classrooms);    
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/buildings/download?name=' + name;
  }

  add(): void {
      this.router.navigate(['classrooms/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted classroom with id ' + id);
        this.classroomService.delete(id).subscribe(data => {
          this.getClassrooms();
        });
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Teacher } from './shared/teacher.model';
import { TeacherService } from './shared/teacher.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
    selector: 'teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']    
})

export class TeachersComponent implements OnInit {
    teachers: Teacher[];

    constructor(
        private teacherService: TeacherService,
        private router: Router,
        public mdDialog: MdDialog
    ){}

    ngOnInit(): void {
        this.getTeachers();
    }

    getTeachers(): void {
        this.teacherService.getAll().subscribe(teachers => this.teachers = teachers);
    }

    getImageUrl(name: string): string {
        return 'http://localhost:8080/teachers/download?name=' + name;
    }

    add(): void {
        this.router.navigate(['/teachers/new']);
    }

    openConfirmationDialog(id: number): void {
        let dialog = this.mdDialog.open(DeleteConfirmationComponent);

        dialog.afterClosed().subscribe(result => {
            if(result == 'delete') {
                console.log('Deleted teacher with id ' + id);
                this.teacherService.delete(id).subscribe(data => {
                    this.getTeachers();
                });
            }
        });
    }
}
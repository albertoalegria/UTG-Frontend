import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Teacher } from '../shared/teacher.model';
import { TeacherService } from '../shared/teacher.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'teacher',
    templateUrl: 'teacher.component.html',
    styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class TeacherComponent implements OnInit {
    teacher: Teacher;

    constructor(
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute,
        public mdDialog: MdDialog,
        private location: Location,
        private router: Router
    ){}
    
    ngOnInit(): void {
        this.activatedRoute.params.switchMap((params: Params) =>
                                            this.teacherService.get(+params['id']))
                                            .subscribe(teacher => this.teacher = teacher);
    }

    getImageUrl(name: string): string {
        return 'http://localhost:8080/teachers/download?name=' + name;
    }

    openConfirmationDialog(id: number): void {
        let dialog = this.mdDialog.open(DeleteConfirmationComponent);

        dialog.afterClosed().subscribe(result => {
            if(result == 'delete') {
                console.log('Deleted teacher with id ' + id);
                this.teacherService.delete(id).subscribe(data => {
                    this.router.navigate(['/teachers']);
                });
            }
        });
    }

    goBack(): void {
        this.location.back();
    } 
}
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FileUploader } from 'ng2-file-upload';

import { Teacher } from '../../shared/teacher.model';
import { TeacherService } from '../../shared/teacher.service';
import { Group } from '../../../groups/shared/group.model';
import { GroupService } from '../../../groups/shared/group.service';
import { Course } from '../../../courses/shared/course.model';
import { CourseService } from '../../../courses/shared/course.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
    selector: 'create-teacher',
    templateUrl: 'create-teacher.component.html',
    styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateTeacherComponent implements OnInit {
    @ViewChild('inputFile') inputFile: ElementRef;

    public uploader: FileUploader = new FileUploader({
        url: 'http://localhost:8080/teachers/upload'
    });

    help = false;
    groups: Group[];
    courses: Course[];
    groupHolders: GroupsHolder[];
    studyLevels: string[];
    checkIn: string[];
    checkOut: string[];

    constructor(
        private teacherService: TeacherService,
        private groupService: GroupService,
        private courseService: CourseService,
        private utilsService: UtilsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.groupHolders = [];
        this.groupService.getAll().subscribe(g => {
            this.groups = g;
            this.groups.forEach(x => {
                let gh: GroupsHolder = new GroupsHolder();
                gh.group = x;
                this.courseService.getByGroup(x.id).subscribe(c => {
                    gh.courses = c;
                    this.groupHolders.push(gh);
                });
            });
        });

        this.utilsService.getStudyLevels().subscribe(s => this.studyLevels = s);
        this.utilsService.getCheckIn().subscribe(i => this.checkIn = i);
        this.utilsService.getCheckOut().subscribe(o => this.checkOut = o);
    }

    onSubmit(teacher: Teacher): void {
        this.teacherService.create(teacher).subscribe(() => {
            this.router.navigate(['/teachers']);
        });
    }

    disableHelp() {
        this.help = !this.help;
    }

    uploadFile(): void {
        this.inputFile.nativeElement.click();
    }

    onChange(inputFile: any): void {
        let file = inputFile.target.files[0];
        console.log(file);
    }
}

class GroupsHolder {
    group: Group;
    courses: Course[];
}
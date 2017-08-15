import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Course } from './shared/course.model';
import { CourseService } from './shared/course.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class CoursesComponent implements OnInit {
  courses: Course[];

  constructor(
    private courseService: CourseService,
    private router: Router,
    public mdDialog: MdDialog
  ) {}

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings(): void {
    this.courseService.getAll().subscribe(courses => this.courses = courses);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/buildings/download?name=' + name;
  }

  add(): void {
    this.router.navigate(['/courses/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted course with id ' + id);
        this.courseService.delete(id).subscribe(data => {
          this.getBuildings();
        });
      }
    });
  }
}

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Course } from '../shared/course.model';
import { CourseService } from '../shared/course.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class CourseComponent implements OnInit {
  course: Course;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    public mdDialog: MdDialog,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) =>
                                this.courseService.get(+params['id']))
                                .subscribe(course => this.course = course);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/buildings/download?name=' + name;
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted course with id ' + id);
        this.courseService.delete(id).subscribe(data => {
          this.router.navigate(['/courses']);
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

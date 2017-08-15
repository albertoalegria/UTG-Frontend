import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Career } from './shared/career.model';
import { CareerService } from './shared/career.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
  selector: 'careers',
  templateUrl: 'careers.component.html',
  styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class CareersComponent implements OnInit {
  careers: Career[];

  constructor(
    private careerService: CareerService,
    private router: Router,
    private mdDialog: MdDialog
  ) {}

  ngOnInit(): void {
    this.getCareers();
  }

  getCareers(): void {
    this.careerService.getAll().subscribe(careers => this.careers = careers);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download?name=' + name;
  }

  add(): void {
    this.router.navigate(['/careers/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted career with id ' + id);
        this.careerService.delete(id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

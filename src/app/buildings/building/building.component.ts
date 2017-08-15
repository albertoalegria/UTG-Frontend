import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Building } from '../shared/building.model';
import { BuildingService } from '../shared/building.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'building',
  templateUrl: './building.component.html',
  styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class BuildingComponent implements OnInit {
  building: Building;

  constructor(
    private buildingService: BuildingService,
    private activatedRoute: ActivatedRoute,
    public mdDialog: MdDialog,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) =>
                                this.buildingService.get(+params['id']))
                                .subscribe(building => this.building = building);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/buildings/download?name=' + name;
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted building with id ' + id);
        this.buildingService.delete(id).subscribe(data => {
          this.router.navigate(['/buildings']);
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

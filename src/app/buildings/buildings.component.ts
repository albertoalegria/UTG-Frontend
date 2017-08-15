import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Building } from './shared/building.model';
import { BuildingService } from './shared/building.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
  selector: 'buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class BuildingsComponent implements OnInit {
  buildings: Building[];

  constructor(
    private buildingService: BuildingService,
    private router: Router,
    public mdDialog: MdDialog
  ) {}

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings(): void {
    this.buildingService.getAll().subscribe(buildings => this.buildings = buildings);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/buildings/download?name=' + name;
  }

  add(): void {
    this.router.navigate(['/buildings/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted building with id ' + id);
        this.buildingService.delete(id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

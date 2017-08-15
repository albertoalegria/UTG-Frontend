import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { FileUploader } from 'ng2-file-upload';

import { Building } from '../../shared/building.model';
import { BuildingService } from '../../shared/building.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit-building',
  templateUrl: 'edit-building.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class EditBuildingComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;

  public uploader:FileUploader = new FileUploader({ url: 'http://localhost:8080/buildings/upload' });

  building: Building;

  constructor(
    private buildingService: BuildingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) => this.buildingService.get(+params['id']))
                                                        .subscribe(building => this.building = building);
  }

  onSubmit(building: Building): void {
    if (this.uploader.queue.length > 0) {
      let img = this.uploader.queue[0];
      img.upload();
      console.log('uploaded image ' + img.file.name);
      this.building.imgPath = img.file.name;
    }

    this.building.name = building.name;

    this.buildingService.update(this.building).subscribe(data => {
      this.location.back();
    });
  }

  uploadFile(): void {
    this.inputFile.nativeElement.click();
  }

  onChange(inputFile: any): void {
    let file = inputFile.target.files[0];
    console.log(file);
  }
}

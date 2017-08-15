import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { Building } from '../../shared/building.model';
import { BuildingService } from  '../../shared/building.service';

@Component({
  selector: 'create-building',
  templateUrl: 'create-building.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateBuildingComponent {
  @ViewChild('inputFile') inputFile: ElementRef;

  public uploader:FileUploader = new FileUploader({
    url: 'http://localhost:8080/buildings/upload'
  });

  constructor(
    private buildingService: BuildingService,
    private router: Router
  ) {}

  onSubmit(building: Building): void {
    building.imgPath = 'undefined';

    if (this.uploader.queue.length > 0) {
      let img = this.uploader.queue[0];
      img.upload();
      console.log('uploaded image ' + img.file.name);
      building.imgPath = img.file.name;
    }

    this.buildingService.create(building).subscribe(data => {
      this.router.navigate(['/buildings']);
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

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { Career } from '../../shared/career.model';
import { CareerService } from '../../shared/career.service';

@Component({
  selector: 'create-career',
  templateUrl: 'create-career.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateCareerComponent {
  @ViewChild('inputFile') inputFile: ElementRef;

  public uploader:FileUploader = new FileUploader({
    url: 'http://localhost:8080/careers/upload'
  });

  constructor(
    private careerService: CareerService,
    private router: Router
  ) {}

  onSubmit(career: Career): void {
    career.imgPath = 'undefined';

    if (this.uploader.queue.length > 0) {
      let img = this.uploader.queue[0];
      img.upload();
      console.log('uploaded image ' + img.file.name);
      career.imgPath = img.file.name;
    }

    this.careerService.create(career).subscribe(data => {
      this.router.navigate(['/careers']);
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

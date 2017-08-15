import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { FileUploader } from 'ng2-file-upload';

import { Career } from '../../shared/career.model';
import { CareerService } from '../../shared/career.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit-career',
  templateUrl: 'edit-career.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class EditCareerComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;

  public uploader:FileUploader = new FileUploader({ url: 'http://localhost:8080/careers/upload' });

  career: Career;

  constructor(
    private careerService: CareerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) => this.careerService.get(+params['id']))
                                                        .subscribe(career => this.career = career);
  }

  onSubmit(career: Career): void {
    if (this.uploader.queue.length > 0) {
      let img = this.uploader.queue[0];
      img.upload();
      console.log('uploaded image ' + img.file.name);
      this.career.imgPath = img.file.name;
    }

    this.career.name = career.name;
    this.career.acronym = career.acronym;

    this.careerService.update(this.career).subscribe(data => {
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

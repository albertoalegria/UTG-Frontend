import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Classroom } from '../../shared/classroom.model';
import { ClassroomService } from '../../shared/classroom.service';
import { Building } from '../../../buildings/shared/building.model';
import { BuildingService } from '../../../buildings/shared/building.service';
import { UtilsService } from '../../../utils/utils.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'edit-classroom',
    templateUrl: 'edit-classroom.component.html',
    styleUrls: ['../../../../assets/css/cards.css']    
})

export class EditClassroomComponent implements OnInit {
    types: string[];
    buildings: Building[];
    help: boolean = false;
    classroom: Classroom;

    constructor(
        private utilsService: UtilsService,
        private buildingService: BuildingService,
        private classroomService: ClassroomService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.switchMap((params: Params) => this.classroomService.get(+params['id']))
                                                                            .subscribe(classroom => this.classroom = classroom);

        this.utilsService.getTypes().subscribe(types => this.types = types);
        this.buildingService.getAll().subscribe(buildings => this.buildings = buildings);
    }

    onSubmit(classroom: Classroom): void {
        classroom.id = this.classroom.id;

        console.log(classroom);

        this.classroomService.update(classroom).subscribe(data => {
            this.location.back();
        });
    }

    disableHelp() {
        this.help = !this.help;
    }
}
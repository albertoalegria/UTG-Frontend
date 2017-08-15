import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Classroom } from '../../shared/classroom.model';
import { ClassroomService } from '../../shared/classroom.service';
import { Building } from '../../../buildings/shared/building.model';
import { BuildingService } from '../../../buildings/shared/building.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
    selector: 'create-classroom',
    templateUrl: 'create-classroom.component.html',
    styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateClassroomComponent implements OnInit {
    types: string[];
    buildings: Building[];
    help: boolean = false;
    
    constructor(
        private utilsService: UtilsService,
        private buildingService: BuildingService,
        private classroomService: ClassroomService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.buildingService.getAll().subscribe(buildings => this.buildings = buildings);
        this.utilsService.getTypes().subscribe(types => this.types = types);
    }

    onSubmit(classroom: Classroom): void {
        this.classroomService.create(classroom).subscribe(data => {
            this.router.navigate(['/classrooms']);
        });
    }

    disableHelp() {
        this.help = !this.help;
    }

}
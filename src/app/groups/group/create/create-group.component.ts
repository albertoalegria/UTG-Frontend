import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { Curriculum } from '../../../curricula/shared/curriculum.model';
import { CurriculumService } from '../../../curricula/shared/curriculum.service';
import { Career } from '../../../careers/shared/career.model';
import { CareerService } from '../../../careers/shared/career.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'create-group',
  templateUrl: 'create-group.component.html',
  styleUrls: ['../../../../assets/css/cards.css']
})

export class CreateGroupComponent implements OnInit {
  curricula: Curriculum[];
  careers: Career[];
  shifts: string[];
  groupsShifts: string[];
  semesters: number[];
  help = false;
  careerId: number;
  semester: number;
  curriculum: Curriculum;
  available = false;

  constructor(
    private utilsService: UtilsService,
    private groupService: GroupService,
    private curriculumService: CurriculumService,
    private careerService: CareerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.careerService.getAll().subscribe(careers => this.careers = careers);
    this.utilsService.getSemesters().subscribe(semesters => this.semesters = semesters);


  }

  onSubmit(group: Group): void {
    let groups: Group[] = [];

    for (let s of this.groupsShifts) {
      let newGroup: Group = new Group(group.semester, s, group.curriculum);
      
      console.log(newGroup);

      groups.push(newGroup);
    }

    this.groupService.createGroups(groups).subscribe(data => {
      this.router.navigate(['/groups']);
    });
  }

  updateCurricula(): void {
    this.curriculumService.getByCareer(this.careerId).subscribe(curricula => this.curricula = curricula);
  }

  updateShifts(): void {
    this.utilsService.getAvailableShifts(this.curriculum.id, this.semester).subscribe(shifts => {
      this.shifts = shifts;
      this.available = this.shifts.length > 0;
    });
  }

  disableHelp() {
    this.help = !this.help;
  }
}

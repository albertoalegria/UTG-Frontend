import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Group } from '../shared/group.model';
import { GroupService } from '../shared/group.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation.component';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'group',
  templateUrl: 'group.component.html',
  styleUrls: ['../../../assets/css/cards.css',  '../../../assets/css/buttons.css']
})

export class GroupComponent implements OnInit {
  group: Group;

  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    public mdDialog: MdDialog,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.switchMap((params: Params) =>
                                this.groupService.get(+params['id']))
                                .subscribe(group => this.group = group);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download?name=' + name;
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted group with id ' + id);
        this.groupService.delete(id).subscribe(data => {
          this.router.navigate(['/groups']);
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

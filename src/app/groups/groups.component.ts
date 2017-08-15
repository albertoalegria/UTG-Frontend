import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Params, Router } from '@angular/router';

import { Group } from './shared/group.model';
import { GroupService } from './shared/group.service';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';

@Component({
  selector: 'groups',
  templateUrl: 'groups.component.html',
  styleUrls: ['../../assets/css/cards.css',  '../../assets/css/buttons.css']
})

export class GroupsComponent implements OnInit {
  groups: Group[];

  constructor(
    private groupService: GroupService,
    private router: Router,
    private mdDialog: MdDialog
  ) {}

  ngOnInit(): void {
    this.groupService.getAll().subscribe(groups => this.groups = groups);
  }

  getImageUrl(name: string): string {
    return 'http://localhost:8080/careers/download?name=' + name;
  }

  add(): void {
    this.router.navigate(['/groups/new']);
  }

  openConfirmationDialog(id: number): void {
    let dialog = this.mdDialog.open(DeleteConfirmationComponent);

    dialog.afterClosed().subscribe(result => {
      if (result == 'delete') {
        console.log('Deleted group with id ' + id);
        this.groupService.delete(id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

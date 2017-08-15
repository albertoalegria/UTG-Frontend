import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './delete-confirmation.component.html'
})

export class DeleteConfirmationComponent {
  constructor(
    public dialog: MdDialogRef<DeleteConfirmationComponent>
  ) {}
}

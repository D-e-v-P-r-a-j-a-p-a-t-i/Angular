import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancelDelete() {
    this.dialogRef.close(false);
  }
}

import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marios } from '../../models/marios.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-marios-dialog',
  templateUrl: './marios-dialog.component.html',
  styleUrls: ['./marios-dialog.component.scss'],
})
export class MariosDialogComponent {
  @Input() isSender = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { marios: Marios; employee: Employee, isSender: boolean },
    public dialogRef: MatDialogRef<MariosDialogComponent>
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}

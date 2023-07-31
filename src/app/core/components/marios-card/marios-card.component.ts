import { Component, Input } from '@angular/core';
import { Marios } from '../../models/marios.model';
import { Employee } from '../../models/employee.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MariosDialogComponent } from '../marios-dialog/marios-dialog.component';

@Component({
  selector: 'app-marios-card',
  templateUrl: './marios-card.component.html',
  styleUrls: ['./marios-card.component.scss'],
})
export class MariosCardComponent {
  @Input() public marios!: Marios;
  @Input() public employee!: Employee;
  public isHovered = false;

  constructor(public dialog: MatDialog) {}

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      marios: this.marios,
      employee: this.employee,
    };

    const dialogRef = this.dialog.open(MariosDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

import { Component, Input } from '@angular/core';
import { Marios } from '../../models/marios.model';
import { Employee } from '../../models/employee.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MariosDialogComponent } from '../marios-dialog/marios-dialog.component';
import { MariosReaction } from '../../enums/marios-reaction.enum';

@Component({
  selector: 'app-marios-card',
  templateUrl: './marios-card.component.html',
  styleUrls: ['./marios-card.component.scss'],
})
export class MariosCardComponent {
  @Input() isSender = true;
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
      isSender: false
    };

    this.dialog.open(MariosDialogComponent, dialogConfig);
  }

  getBackgroundImage(mariosReaction: MariosReaction): string {
    switch (mariosReaction) {
      case MariosReaction.THANK_YOU:
        return '/assets/images/stars/THANK_YOU.svg';
      case MariosReaction.GOOD_JOB:
        return '/assets/images/stars/GOOD_JOB.svg';
      case MariosReaction.IMPRESSIVE:
        return '/assets/images/stars/IMPRESSIVE.svg';
      case MariosReaction.EXCEPTIONAL:
        return '/assets/images/stars/EXCEPTIONAL.svg';
      case MariosReaction.AWESOME:
        return '/assets/images/stars/AWESOME.svg';
      case MariosReaction.OUTSTANDING:
        return '/assets/images/stars/OUTSTANDING.svg';
      default:
        return '';
    }
  }
}

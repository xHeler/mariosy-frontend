import { Component, Input } from '@angular/core';
import { Marios } from '../../models/marios.model';
import { Employee } from '../../models/employee.model';
import { MariosReaction } from '../../enums/marios-reaction.enum';
import { MatDialog } from '@angular/material/dialog';
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

  getReactionMessage(): string {
    switch (this.marios.reaction) {
      case MariosReaction.THANK_YOU:
        return 'Thank you!';
      case MariosReaction.GOOD_JOB:
        return 'Good job!';
      case MariosReaction.IMPRESSIVE:
        return 'Impressive!';
      case MariosReaction.EXCEPTIONAL:
        return 'Exceptional!';
      case MariosReaction.AWESOME:
        return 'Awesome!';
      case MariosReaction.OUTSTANDING:
        return 'Outstanding!';
      default:
        return 'Great job!';
    }
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(MariosDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

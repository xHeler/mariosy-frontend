import { Component, Input } from '@angular/core';
import { Marios } from '../../models/marios.model';
import { Employee } from '../../models/employee.model';
import { MariosReaction } from '../../enums/marios-reaction.enum';

@Component({
  selector: 'app-marios-card',
  templateUrl: './marios-card.component.html',
  styleUrls: ['./marios-card.component.scss'],
})
export class MariosCardComponent {
  @Input() public marios!: Marios;
  @Input() public employee!: Employee;

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
}

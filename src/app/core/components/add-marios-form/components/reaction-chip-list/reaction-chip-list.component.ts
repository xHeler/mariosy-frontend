import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MariosReaction } from '../../../../enums/marios-reaction.enum';

@Component({
  selector: 'app-reaction-chip-list',
  templateUrl: './reaction-chip-list.component.html',
  styleUrls: ['./reaction-chip-list.component.scss'],
})
export class ReactionChipListComponent {
  @Input() control: FormControl | any;
  enumValues = Object.values(MariosReaction);

  getChipGraphicStyle(value: MariosReaction): object {
    return {
      'background-image': `url(${this.getBackgroundImage(value)})`,
    };
  }

  getBackgroundImage(value: MariosReaction): string {
    switch (value) {
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

import { Pipe, PipeTransform } from '@angular/core';
import { MariosReaction } from 'src/app/core/enums/marios-reaction.enum';

@Pipe({
  name: 'reactionMessage',
})
export class ReactionMessagePipe implements PipeTransform {
  transform(reaction: MariosReaction): string {
    switch (reaction) {
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

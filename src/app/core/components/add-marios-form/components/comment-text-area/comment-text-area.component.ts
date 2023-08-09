import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-text-area',
  templateUrl: './comment-text-area.component.html',
  styleUrls: ['./comment-text-area.component.scss'],
})
export class CommentTextAreaComponent {
  @Input() control: FormControl | any;
  @Input() maxMessageLength = 255;
  title = '';
  characterCount = 0;
}

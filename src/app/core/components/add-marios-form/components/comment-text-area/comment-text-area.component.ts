import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-text-area',
  templateUrl: './comment-text-area.component.html',
  styleUrls: ['./comment-text-area.component.scss'],
})
export class CommentTextAreaComponent implements OnInit {
  @Input() control: FormControl | any;
  characterCount = 0;

  ngOnInit() {
    this.control.get('message')?.valueChanges.subscribe((value: string) => {
      this.characterCount = value.length;
    });
  }

  getCharacterCount(): number {
    return this.characterCount;
  }
}

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-title-text-area',
  templateUrl: './title-text-area.component.html',
  styleUrls: ['./title-text-area.component.scss'],
})
export class TitleTextAreaComponent {
  @Input() control: FormControl | any;
}

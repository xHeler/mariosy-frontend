import { Component, Input } from '@angular/core';
import { MariosElement } from '../../models/marios-element.model';

@Component({
  selector: 'app-marios-list',
  templateUrl: './marios-list.component.html',
  styleUrls: ['./marios-list.component.scss'],
})
export class MariosListComponent {
  @Input() public label = '';
  @Input() mariosList: MariosElement[] = [];
  @Input() isSender = true;
}

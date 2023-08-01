import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public buttonLabel = '';
  @Input() public isDisabled = false;
  @Input() public svgPlacement: 'start' | 'end' | 'none' = 'none';
  @Input() public borderColor?: string;

  @Output() public buttonClick: EventEmitter<void> = new EventEmitter();

  public onClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}

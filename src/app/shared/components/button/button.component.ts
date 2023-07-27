import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public buttonLabel = '';
  @Input() public isDisabled = false;
  @Input() public btnClass = '';
  @Input() public svgPlacement: 'start' | 'end' | 'none' = 'none';
  @Input() public borderColor?: string;

  @Output() public buttonClick: EventEmitter<void> = new EventEmitter();

  public getSvgPlacementMargin(): string {
    if (this.svgPlacement === 'start') {
      return '0 1rem 0 0.5rem';
    } else if (this.svgPlacement === 'end') {
      return '0 0.2rem 0 1rem';
    } else {
      return '0';
    }
  }

  public onClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}

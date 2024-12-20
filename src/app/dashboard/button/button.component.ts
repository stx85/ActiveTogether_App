import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() showForm: boolean | undefined;
  @Output() buttonClickedEvent = new EventEmitter();

  buttonClicked() {
    this.buttonClickedEvent.emit();
  }
}

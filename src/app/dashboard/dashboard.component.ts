import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { DataComponent } from './data/data.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { StoreService } from '../shared/store.service';
import { BackendService } from '../shared/backend.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataComponent, AddDataComponent, ButtonComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  public showForm = true;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {

  }

  buttonClicked() {
    this.showForm = !this.showForm;
  }

  handleModalEvent() {
    this.showForm = !this.showForm;
    this.openModal();
  }

  openModal() {
    const modalElement = this.elementRef.nativeElement.querySelector('#registrationModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal-Element nicht gefunden!');
    }
  }
}

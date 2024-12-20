import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  providers: [ provideNativeDateAdapter() ],
  imports: [
    SharedModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule,
    MatDatepickerModule, MatButtonModule,
    MatCheckboxModule
  ],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDataComponent implements OnInit {
  @Output() positivRegistrationEvent = new EventEmitter();

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
  }
  public registrationForm: any;

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      courseId: ['', Validators.required],
      birthdate: [null, Validators.required],
      newsletter: [false]
    })
  }

  onSubmit() {
    if(this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
      this.positivRegistrationEvent.emit();
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  providers: [ provideNativeDateAdapter(), provideMomentDateAdapter(MY_FORMATS) ],
  imports: [
    SharedModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule,
    MatDatepickerModule, MatButtonModule,
    MatCheckboxModule, FormsModule, ReactiveFormsModule
  ],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddDataComponent implements OnInit {
  @Output() positivRegistrationEvent = new EventEmitter();

  readonly date = new FormControl(moment());

  errorMessage = signal('');

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
  }
  public registrationForm: any;

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      courseId: ['', Validators.required],
      birthdate: [null, Validators.required],
      newsletter: [false],
      email: ['', [Validators.required, Validators.email]],
      registrationDate: ['']
    })
  }

  onSubmit() {
    if(this.registrationForm.valid) {
      // this.registrationForm.get("registrationDate").setValue(moment().format("DD.MM.YYYY HH:mm:ss"));
      this.registrationForm.get("registrationDate").setValue(new Date());
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
      this.positivRegistrationEvent.emit();
      this.removeFormularContent();
    }
  }

  onAbort() {
    this.removeFormularContent();
  }

  removeFormularContent() {
    this.registrationForm.reset();
  }
}

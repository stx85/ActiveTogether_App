import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule, MatCardModule, MatProgressSpinner, MatButtonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  public page: number = 0;

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
        res.push(i + 1);
      }
    return res;
  }

  public deleteClicked(id: any) {
    this.storeService.deletingId = id;
    this.storeService.deletingLoading = true;
    this.backendService.deleteRegistration(id, this.page).subscribe({
      next: (response) => {
          console.log("deleted " + response);
          this.storeService.deletingId = 0;
          this.storeService.deletingLoading = false;
          this.selectPage(this.page);
        }
    });
  }

}

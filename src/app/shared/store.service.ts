import { Injectable } from '@angular/core';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public courses: Course[] = [];
  public registrations: Registration[] = [];
  public registrationTotalCount: number = 0;
  public currentPage: number = 1;
  public cousesLoading = true;
  public registrationsLoading = true;
  public deletingLoading = false;
  public deletingId: number = 0;
  public sortOrtder: String = "asc";
}

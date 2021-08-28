import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaitingLoaderService {

  // Thsi will be take care to show/hide waiting loader by emmiting the boolean value
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  display(value: boolean){
    this.status.next(value);
  }
}

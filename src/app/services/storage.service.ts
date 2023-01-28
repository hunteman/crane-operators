import { Shift } from 'src/app/models/shift';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StorageService{
  shifts = new Subject<Array<Shift>>();

  public changeContacts(changedShifts: Array<Shift>) {
    this.shifts.next(changedShifts); 
 }

  public remove(key: string) {
    window.localStorage.removeItem(key);
  }

  public write(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public read(key: string) {
    const i = window.localStorage.getItem(key);
    return i ? JSON.parse(i) : null;
  }

  public clear() {
    localStorage.clear();
  }

}

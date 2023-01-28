import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modalOpen = new BehaviorSubject<boolean>(false);
  public id = null;

  open(id?: any) {
    this.id = id || null;
    console.log('id: ', this.id);
    this.modalOpen.next(true);
  }

  close() {
    this.id = null;
    this.modalOpen.next(false);
  }
}

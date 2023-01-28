import { ModalService } from './../../services/modal.service';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { Shift } from './../../models/shift';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-work-shifts',
  templateUrl: './work-shifts.component.html',
  styleUrls: ['./work-shifts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService, StorageService]
})
export class WorkShiftsComponent implements OnInit {
  shifts: Array<Shift> = [];

  constructor(
    public storageService: StorageService,
    private dataService: DataService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.dataService.getShifts().subscribe((data:any) => {
      data.forEach((shift: Shift) => {
        this.shifts.push(shift);
      });

      this.storageService.write('shifts', this.shifts);
    });

    this.storageService.shifts.subscribe((shifts: Array<Shift>) => {
      this.shifts = shifts;
    })
  }

  shiftEdit(id: any) {
    console.log('id: ', id);
    this.modalService.open(id);
  }
}

import { ModalService } from './../../services/modal.service';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Shift } from './../../models/shift';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild("modalForm") modalForm: ElementRef|undefined;
  @Input() shifts: Array<Shift>
  fromDates: any = [];
  toDates: any = [];

  public Model: Shift = null;

  defaulValues = {
    cranType: "Выберите тип крана...",
    date: "Выберите дату..."
  };
  open: boolean;
  modalId: any = null;

  form: FormGroup;
  constructor(
    private modalService: ModalService, 
    private el: ElementRef,
    private fb: FormBuilder) {

      // this.form = this.fb.group({
      //   id: [null],
      //   name: [null, Validators.required],
      //   dateFrom: [null, Validators.required],
      //   dateTo: [null, Validators.required],
      //   cranType: [null, Validators.required],
      //   firstCran: [null],
      //   secondCran: [null]
      // })
 

    //   "firstCran": {
    //     "cranName": "Первый кран",
    //     "trucks": [
    //         {
    //             "truckName": "Грузовик1",
    //             "load": 10,
    //             "shift": 0
    //         },
    //         {
    //             "truckName": "Грузовик2",
    //             "load": 10,
    //             "shift": 0
    //         }
    //     ]
    // },
      // modelTemplate(): Promise<Shift> {
      //   const result: IClubEventModel = {
      //     id: null,
      //     entityStatus: EntityStatus.published,
      //     clubId: this.contextService.getRoutingParams().clubId,
      //     parentId: this.parentId,
      //     name: '',
      //     timeFrom: Date.now(),
      //     timeTo: Date.now(),
      //     locationCityId: null,
      //     locationText: null,
      //     locationLat: null,
      //     locationLon: null,
      //     description: null,
      //     eventType: ClubEventType.sport,
      //     specialConditions: null,
      //     entryFee: null,
      //     customEntryFeeLabel: null,
      //     ticketPrice: null,
      //     customTicketPriceLabel: null,
      //     medias: {
      //       images: [],
      //       videos: []
      //     },
      //     isGlobal: false,
      //     shortDescription: null,
      //     eventReport: null,
      //     eventReportTitle: null
      //   };
    
      //   return Promise.resolve(result);
      // }
    
      // buildForm() {
      //   this.form = this.formBuilder.group({
      //     name: [this.Model.name, Validators.required],
      //     // timeFrom: [this.Model.timeFrom, Validators.minLength(3)],
      //     // timeTo: [this.Model.timeTo],
      //     description: [this.Model.description],
      //     locationText: [this.Model.locationText],
      //     locationLat: [this.Model.locationLat],
      //     locationLon: [this.Model.locationLon],
      //     eventType: [this.Model.eventType],
      //     specialConditions: [this.Model.specialConditions],
      //     entryFee: [this.Model.entryFee],
      //     customEntryFeeLabel: [this.Model.customEntryFeeLabel],
      //     ticketPrice: [this.Model.ticketPrice],
      //     customTicketPriceLabel: [this.Model.customTicketPriceLabel],
      //     medias: [this.Model.medias],
      //     isGlobal: [this.Model.isGlobal],
      //     shortDescription: [this.Model.shortDescription, Validators.maxLength(400)],
      //     eventReport: [this.Model.eventReport],
      //     eventReportTitle: [this.Model.eventReportTitle]
      //   });
      // }
      
      // this.form = new FormGroup({
      //   id: new FormControl(null),
      //   name: new FormControl(null, Validators.required),
      //   dateFrom: new FormControl(null, Validators.required),
      //   dateTo: new FormControl(null, Validators.required),
      //   cranType: new FormControl(null, Validators.required),
      //   crans: new FormArray([
      //     new FormGroup({
      //       cranName: new FormControl(null),
      //       trucks: new FormArray([
      //         new FormGroup({
      //           truckName: new FormControl(null, Validators.required),
      //           load: new FormControl(null),
      //           shift:new FormControl(null)
      //         })
      //       ])
      //     })
      //   ])
      // }); 

      this.form = this.fb.group({
        id: [null],
        name: [null, Validators.required],
        dateFrom: [null, Validators.required],
        dateTo: [null, Validators.required],
        cranType: [null, Validators.required],
        firstCran: this.fb.group({
          cranName: [null],
          trucks: this.fb.array([
            this.fb.group({
              truckName: [null, Validators.required],
              load: [null],
              shift: [null],
            })
          ])
        }),
        secondCran: this.fb.group({
          cranName: [null],
          trucks: this.fb.array([
            this.fb.group({
              truckName: [null, Validators.required],
              load: [null],
              shift: [null],
            })
          ])
        }),
        totalLoad: [null],
        totalShip: [null]
      })
    }

    firstCranTrucks(): FormArray {
      console.log('FormArray: ', this.form.get('firstCran').get('trucks') as FormArray);
      return this.form.get('firstCran').get('trucks') as FormArray;
      
    }

    secondCranTrucks(): FormArray {
      return this.form.get('secondCran').get('trucks') as FormArray;
    }

    newTruck(): FormGroup {
      return this.fb.group({
        truckName: null,
        load: null,
        shift: null
      });
    }

    addTruck() {
      this.firstCranTrucks().push(this.newTruck());
    }


  //   {
  //     "id": 1,
  //     "name": "Иванов И.И.",
  //     "dateFrom": "22.02.15 08:00",
  //     "dateTo": "22.02.15 19:00",
  //     "cranType": "double",
  //     "firstCran": {
  //         "cranName": "Первый кран",
  //         "trucks": [
  //             {
  //                 "truckName": "Грузовик1",
  //                 "load": 10,
  //                 "shift": 0
  //             },
  //             {
  //                 "truckName": "Грузовик2",
  //                 "load": 10,
  //                 "shift": 0
  //             }
  //         ]
  //     },
  //     "secondCran": {
  //         "cranName": "Второй кран",
  //         "trucks": [
  //             {
  //                 "truckName": "Грузовик1",
  //                 "load": 5,
  //                 "shift": 10
  //             }
  //         ]
  //     },
  //     "totalLoad": 25,
  //     "totalShip": 10 
  // }
  ngOnInit(): void {
    this.modalService.modalOpen.subscribe(x => {
      this.open = x;
      this.modalId = this.modalService.id;
      console.log('this.modalId: ', this.modalService.id);
      this.form.reset();
      
      if(this.modalId) {
        setTimeout(() => {
          let shift = this.shifts.find(shift => shift.id === this.modalId);

          console.log('shift: ', shift);
          const firstCranTrucks = this.form.get('firstCran').get('trucks') as FormArray;
          const secondCranTrucks = this.form.get('secondCran').get('trucks') as FormArray;
          console.log('secondCranTrucks: ', secondCranTrucks);
          console.log('secondCranTrucks: ', secondCranTrucks.length);

          let totalLoad = 0;
          let totalShip = 0;

          while (firstCranTrucks.length) {
            firstCranTrucks.removeAt(0);
          }

          this.form.get('firstCran').patchValue(shift.firstCran.trucks);
          if(shift.secondCran) this.form.get('secondCran').patchValue(shift.secondCran.trucks);

          shift.firstCran.trucks.forEach(truck => {
            totalLoad += truck.load;
            totalShip += truck.shift;
            firstCranTrucks.push(this.fb.group(truck));
          });

          if(!shift.secondCran) {
            console.log('shift.secondCran: ', shift.secondCran);
            // this.form.removeControl('secondCran');
            this.form.setControl('secondCran', null);
            console.log('this.form: ', this.form);
          } else {
            while (secondCranTrucks.length) {
              secondCranTrucks.removeAt(0);
            }

            shift.secondCran.trucks.forEach(truck => {
              totalLoad += truck.load;
              totalShip += truck.shift;
              secondCranTrucks.push(this.fb.group(truck));
            });
          }


          
          // if(shift.secondCran && shift.secondCran.trucks.length) {

          // } 
          //this.form.get('secondCran').patchValue(null);

          this.form.get('totalLoad').patchValue(totalLoad);
          this.form.get('totalShip').patchValue(totalShip);
          this.form.setValue(shift);
          console.log('this.form: ', this.form);

          // this.form.get(['firstCran', 'cranName']).setValue(shift.firstCran.cranName);
          // this.form.get(['firstCran', 'trucks']).setValue(shift.firstCran.trucks);
        }, 0)
      }
      this.firstCranTrucks();
      console.log('this.form: ', this.form);
    });

    console.log('this.modalId: ', this.modalId);
    console.log('shifts: ', this.shifts);
    this.setFromDates();
    this.setToDates();

    // this.form.setValue(this.shift);

  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.modalForm.nativeElement.contains(event.target)) {
      this.modalService.close();
    }
  }

  public modalClose() {
    this.modalService.close();
  }

  setFromDates() {
    let now = new Date();
    now.setHours(8);
    let x = 7;
    while (x --> 0) 
    {
      const addZero = (d: any) => ('0' + d).slice(-2);
      let date = now.getFullYear()+'.'+addZero(now.getMonth()+1)+'.'+addZero(now.getDate()-x)+' '+addZero(now.getHours())+':00';
      this.fromDates.push(date);
    }
  }

  setToDates() {
    let now = new Date();
    now.setHours(19);
    let x = 7;
    while (x --> 0) 
    {
      const addZero = (d: any) => ('0' + d).slice(-2);
      let date = now.getFullYear()+'.'+addZero(now.getMonth()+1)+'.'+addZero(now.getDate()-x)+' '+addZero(now.getHours())+':00';
      this.toDates.push(date);
    }
  }
}

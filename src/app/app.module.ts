import { StorageService } from './services/storage.service';
import { DataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WorkShiftsComponent } from './components/work-shifts/work-shifts.component';
import { HttpClientModule }   from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorkShiftsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StorageService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

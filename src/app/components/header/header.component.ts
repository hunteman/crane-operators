import { ModalService } from './../../services/modal.service';
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  modalOpen() {
    this.modalService.open(null);
  }
}

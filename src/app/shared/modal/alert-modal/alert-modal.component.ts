import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input()
  message!: string;

  @Input()
  type = 'success'; 
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}

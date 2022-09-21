import { Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input()
  title: string = "Tem certeza?";

  @Input() 
  confirmResult!: Subject<boolean>;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  
  onConfirm(){
    // this.confirmResult = new Subject();
    this.confirmResult.next(true);
    this.activeModal.close();
  }
  
  onDecline(){
    // this.confirmResult = new Subject();
    this.confirmResult.next(false);
    this.activeModal.close();
  }
}

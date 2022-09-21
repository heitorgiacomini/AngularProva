import { Subject } from 'rxjs';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  showAlert(message: string, type: 'success' | 'warning' | 'danger' | 'info', dismissTimeout?: number) {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;

    if (dismissTimeout) {
      setTimeout(() => modalRef.close(), dismissTimeout);
    }
  }
 
  //instancia ng-template
  openModal(component: any ) {
    const modalRef = this.modalService.open(component); 
    return modalRef;
  }
  
  showConfirm(title?: string ){//: Subject<boolean>{
    const modalRef = this.modalService.open(ConfirmModalComponent);
    if(title){
      modalRef.componentInstance.title = title;  
    }
    modalRef.componentInstance.confirmResult = new Subject<boolean>();
    return (<ConfirmModalComponent>modalRef.componentInstance).confirmResult;
  }











}

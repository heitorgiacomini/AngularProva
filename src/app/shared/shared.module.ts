import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './modal/alert-modal/alert-modal.component';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
// import { NgbdModalBasic } from './modal-basic';


@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    BrowserTestingModule, 
    // NgbModule
  ],
  exports: [
    AlertModalComponent
  ]
})
export class SharedModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  catchError,
  Observable,
  of,
  Subject,
  take,
  switchMap,
  EMPTY,
} from 'rxjs';
import { ModalService } from 'src/app/shared/modal/alert-modal.service';
import { Curso } from '../curso'; 
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {  
  cursos$!: Observable<Curso[]>;

  deleteModalRef!: NgbModalRef;
  @ViewChild('deleteModal', { static: true })
  deleteModal!: any;
 
  error$ = new Subject<boolean>();

  cursoId!: number;

  constructor(
    private _cursoService: Cursos2Service,
    private router: Router,
    private route: ActivatedRoute,
    private _modalService: ModalService
  ) {}

  ngOnInit() {
    // this._cursoService.list()
    // .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this._cursoService.List().pipe(
      catchError((error) => {
        // this.error$.next(true);
        this.handleError();
        return of();
      })
    ); 
  } 

  handleError() {
    this._modalService.showAlert(
      'Erro ao carregar cursos. Tente novamente mais tarde.',
      'danger'
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
  
  onDelete(id: any) {
    this.cursoId = id;
    // this.deleteModalRef = this._modalService.openModal(this.deleteModal);
    // this._modalService.showConfirm();

    const result$ = this._modalService.showConfirm();
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this._cursoService.Delete(this.cursoId) : of()
        )
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => {
          this._modalService.showAlert(
            'Erro ao remover curso. Tente novamente mais tarde.',
            'danger'
          );
        }
      );
  } 

}

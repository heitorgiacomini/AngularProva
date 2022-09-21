import { Curso } from './../curso';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/alert-modal.service';
import { Location } from '@angular/common';
import { map, switchMap, tap } from 'rxjs';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _cursosService: Cursos2Service,
    private _alertModalService: ModalService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required
        ],
      ],
      telefone: [
        curso.telefone,
        [
          Validators.required
        ],
      ]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this._cursosService.Save(this.form.value).subscribe(
        (success) => {
          this._alertModalService.showAlert(
            'Curso salvo com sucesso!',
            'success',
            1500
          );
          this._location.back();
        },
        (error) =>
          this._alertModalService.showAlert(
            'Ocorreu um erro ao salvar o curso, tente novamente!',
            'danger',
            1500
          ),
        () => {}
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field)!.errors
    // return this.form.controls[field].errors;
  }
}

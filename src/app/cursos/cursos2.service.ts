import { Curso } from './curso';
import { CrudService } from './../shared/crud-service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(
    protected override _http: HttpClient
  ) {
    super(_http, `${environment.API}/cursos`);
  } 
   
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { environment } from 'src/environments/environment';
import { delay, Observable, take, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}/cursos`;
  constructor(private _http: HttpClient) { }

  List() {
    return this._http.get<Curso[]>(this.API)
      .pipe(
        tap(console.log),
        delay(600)
      );
  }

  GetById(id: number) {
    return this._http.get<Curso>(`${this.API}/${id}`)
    .pipe(
      take(1)
    );
  }
  Create(curso: Curso) {
    return this._http.post(this.API, curso)
    .pipe(
      take(1)
    );
  }

  Update(curso: Curso) {
    return this._http.put(`${this.API}/${curso.id}`, curso)
    .pipe(
      take(1)
    );
  }
  
  Delete(id:number){
    return this._http.delete(`${this.API}/${id}`)
    .pipe(
      take(1)
    );
  }

  Save(curso: Curso){
    if(curso.id){
      return this.Update(curso);
    }
    return this.Create(curso);
  }


}

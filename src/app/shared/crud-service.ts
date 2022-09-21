import { take, tap, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class CrudService<T> {

    constructor(
        protected _http: HttpClient,
        private API: string
    ) { } 

    List() {
      return this._http.get<T[]>(this.API)
        .pipe(
          tap(console.log),
          delay(600)
        );
    }
  
    GetById(id: number) {
      return this._http.get<T>(`${this.API}/${id}`)
      .pipe(
        take(1)
      );
    }
    Create(entity: T) {
      return this._http.post(this.API, entity)
      .pipe(
        take(1)
      );
    }
  
    Update(entity: T) {
      return this._http.put(`${this.API}/${entity['id' as keyof T]}`, entity)
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
  
    Save(entity: T){
      if(entity['id' as keyof T]){
        return this.Update(entity);
      }
      return this.Create(entity);
    }
}

import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { filter, map, pipe, tap } from "rxjs";

export function FilterResponse<T>(){
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((event:any)=> event.body)//map((event: HttpResponse<T>) => event.body)// === HttpEventType.Response ? event.body : event)
  );

}

export function UploadProgress<T>(cb:(progress:number) => void){
  return tap((event: HttpEvent<T>) => {
    if(event.type === HttpEventType.UploadProgress){
      cb(Math.round(100 * event.loaded / event.total!));
    }
  });
}

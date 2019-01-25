import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl= "https://recruitmentportalapp.cfapps.io/api/file/upload";
  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(this.baseUrl,formdata,{
       reportProgress:true,
      observe:'events'
    })
  }

  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}

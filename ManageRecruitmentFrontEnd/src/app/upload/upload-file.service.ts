import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExceptionModel } from '../_models';



@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl= "https://recruitmentportalapp.cfapps.io";
  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST',this.baseUrl+"/api/file/upload", formdata, {
      reportProgress: true,
      responseType: 'json'
    });
 
    return this.http.request(req);

  }

  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}

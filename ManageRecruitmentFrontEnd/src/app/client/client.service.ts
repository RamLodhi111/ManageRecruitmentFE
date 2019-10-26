import { catchError } from 'rxjs/operators';
import { AddClient } from './../_models/addClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //private baseUrl = "http://localhost:9000";
  private baseUrl  =  'https://recruitmentportalapp.cfapps.io';

  constructor(private http: HttpClient) { }

  addClient(addClient: AddClient): Observable<any> {
    return this.http.post(`${this.baseUrl}/clientDetails/save`, addClient).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = error.message;
    } else {
      // server-side error
      errorMessage = error;
    }
    return throwError(errorMessage);
  }

  getAllCients() {
    return this.http.get<AddClient[]>(`${this.baseUrl}/clientDetails/findAll`);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<AddClient[]>(`${this.baseUrl}/clientDetails/deleteClient/` + id);
  }

  deleteClients(clients: AddClient[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/clientDetails/deleteClients`, clients);
  }

  updateClient(updateClient: AddClient): Observable<any> {
    return this.http.post(`${this.baseUrl}/clientDetails/update`, updateClient);
  }


}

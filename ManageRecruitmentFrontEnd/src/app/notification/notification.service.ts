import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //private baseUrl= "http://localhost:9001";
  //private API_URL= "http://localhost:9000";

  private baseUrl= "https://registeruserservicesapp.cfapps.io";
  private API_URL= "https://recruitmentportalapp.cfapps.io";

  constructor(private http: HttpClient) { }

  public loadAllApprovals():Observable<any>{
    return this.http.get(`${this.baseUrl}/users`);
  }

  public updateApprovalStatus(user: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/update`, user);
  }
  
  public approveUser(user: any):Observable<any>{
    return this.http.post(`${this.API_URL}/usersapi/userDetails`, user);
  } 

}

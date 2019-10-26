import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'
export const USER_ROLE="role";

@Injectable({
  providedIn: 'root'
})
export class JWTAuthServicesService {

 API_URL  =  'https://recruitmentportalapp.cfapps.io';

   //API_URL  =  'http://localhost:9000'
  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username, password) {
    
    return this.http.post<any>(
      `${this.API_URL}/authenticate`,{
        username,
        password,
      }).pipe(
        map(
          data => {

            if (data) {
              data.authdata =  window.btoa(username + ':' + password);
            let token =data.token;
            let jwtData = token.split('.')[1] 
            let decodedJsonToken=window.atob(jwtData);
            let decodedToken = JSON.parse(decodedJsonToken);
            sessionStorage.setItem(USER_ROLE , decodedToken.role);
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            }
            return data;
          }
        ));
    //console.log("Execute Hello World Bean Service")
  }



  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

}

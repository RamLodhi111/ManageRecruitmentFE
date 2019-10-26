import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthenticationService {
    API_URL  =  'https://recruitmentportalapp.cfapps.io';

    constructor(private http: HttpClient) { }

    listUsersInDB(){
        this.http.get(`${this.API_URL}/usersapi/userDetails`).subscribe((data: Array<Object>) =>{
            console.log(data);
        });
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }),catchError(this.handleError));
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
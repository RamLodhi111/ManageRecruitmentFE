import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { MessageService } from 'primeng/components/common/messageservice';
import { AddClient} from '../_models/addClient';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    API_URL  =  'https://recruitmentportalapp.cfapps.io';

    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }


    addClient(addClient: AddClient): Observable<any> {
        console.log("addclient method in service ::: "+JSON.stringify(addClient));
        return this.http.post(`${this.API_URL}/clientDetails/save`, addClient);
    }
}
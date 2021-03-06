﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from './../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.get<any>(`${config.apiUrl}/users`)
            .pipe(map(users => {
                console.log(users);
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    console.log(user);
                    console.log(username);
                    console.log(password);
                    if (user.username == username && user.password == password) {
                        // login successful if there's a jwt token in the response
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        return user;
                    }
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
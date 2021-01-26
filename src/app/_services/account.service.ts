import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'account/login', model).pipe(
    map((response: User) => {
      const user = response;
      if (user) {
        this.setCurrentUser(user);
      }
    })
  )
}

setCurrentUser(user: User) {
  if(user != null){ // for null user should show Auth error
  user.roles = [];
  const roles = this.getDecodedToken(user.token).role;
  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
   this.currentUserSource.next(user);
  }else{
    this.currentUserSource.next(user);
  }
}

getDecodedToken(token) {
  return JSON.parse(atob(token.split('.')[1]));//atob() function decodes a string of data which has been encoded using Base64 encoding. You can use the btoa() method to encode and transmit data which may otherwise cause communication problems, then transmit it and use the atob() method to decode the data again
}

logout() {
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
}

register(model: any) {
  return this.http.post(this.baseUrl + 'account/register', model).pipe(
    map((user: User) => {
      if (user) {
       this.setCurrentUser(user);
      }
    })
  )
}

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users/GetUsers').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(id: number) {
    const member = this.members.find(x => x.id === id);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/GetUser/' + id);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/UpdateUserProfile', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

}

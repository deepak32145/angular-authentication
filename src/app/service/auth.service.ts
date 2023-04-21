import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/user';

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }
  GetUserByCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  GetAll() {
    return this.http.get(this.apiurl);
  }
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  GetRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
  getUserRole() {
    return this.http.get('http://localhost:3000/role');
  }
  updateUser(id: any, inputData: any) {
    return this.http.put(this.apiurl + '/' + id, inputData);
  }
}

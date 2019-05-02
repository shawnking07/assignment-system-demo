import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login({ username, password }) {
    return this.http.post(baseUrl + '/user/login', {username, password}, {responseType: 'text'});
  }

  signup({username, password, role}) {
    return this.http.post(baseUrl + '/user/signup', {username, password, role});
  }
}

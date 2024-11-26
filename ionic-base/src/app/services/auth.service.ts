import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfor } from '../models/user';

@Injectable({
 providedIn: 'root',
})
export class AuthService {
 API_SERVER = 'http://localhost:8088/api/user';
 httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

 httpOptionsWithAuthorized(token: string | null) {
  return {
   withCredentials: true,
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   }),
  };
 }
 constructor(private httpClient: HttpClient) {}

 register(payload: any) {
  const url = `${this.API_SERVER}/register`;
  return this.httpClient.post<any>(url, payload, this.httpOptions);
 }

 login(loginInfor: LoginInfor) {
  const url = `${this.API_SERVER}/login`;
  return this.httpClient.post<any>(url, loginInfor, this.httpOptions);
 }

 forgotPassword(data: { email: string }) {
  const url = `${this.API_SERVER}/forgot-password`;
  return this.httpClient.post<any>(url, data, this.httpOptions);
 }

 resetPassword(payload: any, token: string) {
  const url = `${this.API_SERVER}/reset-password`;
  return this.httpClient.patch<any>(url, payload, this.httpOptionsWithAuthorized(token));
 }
}

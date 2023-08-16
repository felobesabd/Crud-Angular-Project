import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRej, LoginRej } from '../content/Auth';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

createAccService(model: AuthRej) {
  return this.http.post(`${environment.baseApi}auth/createAccount`, model)
}

  loginService(model: LoginRej):Observable<LoginRej> {
    return this.http.post<LoginRej>(`${environment.baseApi}auth/login`, model)
  }
}

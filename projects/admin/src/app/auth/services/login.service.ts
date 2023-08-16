import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'projects/admin/src/Models/Auth';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceLoginService {
  //httpOptions;

  constructor(private http: HttpClient) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //   }),
    // };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  createLogin(model: Login): Observable<Login> {
    return this.http.post<Login>('http://127.0.0.1:8000/auth/login', model)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}

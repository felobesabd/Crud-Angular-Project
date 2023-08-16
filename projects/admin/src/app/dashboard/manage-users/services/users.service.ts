import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface UserStatus {
  id: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userData = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  getAllUsersService(filteration: Object) {
    let params = new HttpParams();
    if (filteration) {
      Object.entries(filteration).forEach(([key, value]) => {
        if (value) {
          params = params.append(key, value);
          console.log(key, value);
        }
      });
    }
    return this.http.get(`${environment.baseApi}auth/users`, { params });
  }

  deleteUserService(id: string) {
    return this.http.delete(`${environment.baseApi}auth/user/${id}`);
  }

  getStatusUserService(model: UserStatus) {
    return this.http.put(`${environment.baseApi}auth/user-status`, model);
  }

  getAllUserDataBSub(model?: any) {
    this.getAllUsersService(model).subscribe((res: any)=> {
      this.userData.next({
        data: res?.users,
        totalItems: res?.totalItems,
      })
    })
  }

}

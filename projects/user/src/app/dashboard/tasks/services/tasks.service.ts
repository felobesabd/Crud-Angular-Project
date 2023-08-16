import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasksUserService(userId: string, tasksParams: any) {
    let params = new HttpParams()
    Object.entries(tasksParams).forEach(([key, value]: any)=> {
      params = params.append(key, value);
      console.log(key, value);
    })
    return this.http.get(`${environment.baseApi}tasks/user-tasks/${userId}`, {params})
  }

  completeTasksService(id: any) {
    return this.http.put(`${environment.baseApi}tasks/complete`, id)
  }

  getTaskDetailsService(id: string) {
    return this.http.get(`${environment.baseApi}tasks/task/${id}`)
  }

}

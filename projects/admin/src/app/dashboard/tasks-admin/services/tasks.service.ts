import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from 'projects/admin/src/Models/Tasks';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  //httpOptions;

  constructor(private http:HttpClient) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //   }),
    // };
  }

getAllTasks(filteration: Object) {
  let params = new HttpParams()
  Object.entries(filteration).forEach(([key, value])=> {
    if (filteration) {
      params = params.append(key, value);
      console.log(key, value);
    }
  })
  return this.http.get(`http://127.0.0.1:8000/tasks/all-tasks`, {params})
}

createFormTask(model: FormData):Observable<Tasks> {
  return this.http.post<Tasks>(`http://127.0.0.1:8000/tasks/add-task`, model);
}

deleteTask(id: string):Observable<string> {
  return this.http.delete<string>(`http://127.0.0.1:8000/tasks/delete-task/${id}`);
}

updateTask(model: Object, id: string):Observable<Object> {
  return this.http.put<Object>(`http://127.0.0.1:8000/tasks/edit-task/${id}`, model);
}

}

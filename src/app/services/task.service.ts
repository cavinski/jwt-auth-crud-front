import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TaskService {

  private api = 'http://localhost:8080/tasks';

  constructor(
    private http: HttpClient
  ) {}

  getTasks(): Observable<any> {
    return this.http.get(this.api);
  }

  createTask(task: any) {
    return this.http.post(this.api, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

}

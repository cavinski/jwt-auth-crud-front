import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/task';
import { TaskRequest } from '../models/task-request';

@Injectable({
  providedIn: 'root',
})

export class TaskService {

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}/tasks`);
  } 

  findById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/tasks/${id}`);
  }

  create(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.api}/tasks`, task);
  }

  update(id: number, task: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.api}/tasks/${id}`, task);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/tasks/${id}`);
  }

}

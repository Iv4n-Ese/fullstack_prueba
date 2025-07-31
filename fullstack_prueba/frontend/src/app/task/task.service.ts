import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../core/models/task.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private base = `${environment.apiUrl}/task`;

  constructor(private http: HttpClient) {}

  list(): Observable<{ tasks: Task[] }> {
    return this.http.get<{ tasks: Task[] }>(this.base);
  }

  create(task: Partial<Task>): Observable<any> {
    return this.http.post(this.base, task);
  }

  update(id: number, updates: Partial<Task>): Observable<any> {
    return this.http.put(`${this.base}/${id}`, updates);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}

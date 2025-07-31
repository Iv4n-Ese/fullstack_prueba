import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../tasks/task.service';
import { Task } from '../../core/models/task.model';
import { AuthService } from '../../auth/auth.service';

type Filter = 'todas' | 'pendiente' | 'completado';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: Filter = 'todas';
  filtered: Task[] = [];
  error = '';

  constructor(private taskSvc: TaskService, private auth: AuthService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.taskSvc.list().subscribe({
      next: res => {
        this.tasks = res.tasks;
        this.applyFilter();
      },
      error: err => (this.error = 'No se pudieron cargar tareas')
    });
  }

  applyFilter() {
    if (this.filter === 'todas') {
      this.filtered = this.tasks;
    } else {
      this.filtered = this.tasks.filter(t => t.status === this.filter);
    }
  }

  setFilter(f: Filter) {
    this.filter = f;
    this.applyFilter();
  }

  toggleStatus(task: Task) {
    const newStatus = task.status === 'pendiente' ? 'completado' : 'pendiente';
    this.taskSvc.update(task.id, { status: newStatus }).subscribe({
      next: () => this.load()
    });
  }

  delete(task: Task) {
    if (!confirm('¿Eliminar esta tarea?')) return;
    this.taskSvc.delete(task.id).subscribe({
      next: () => this.load()
    });
  }

  logout() {
    this.auth.logout();
  }
}

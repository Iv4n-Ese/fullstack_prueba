import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../tasks/task.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  @Input() editingTask: Task | null = null;
  @Output() saved = new EventEmitter<void>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['pendiente']
  });

  constructor(private fb: FormBuilder, private taskSvc: TaskService) {}

  ngOnInit() {
    if (this.editingTask) {
      this.form.patchValue({
        title: this.editingTask.title,
        description: this.editingTask.description,
        status: this.editingTask.status
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    if (this.editingTask) {
      this.taskSvc.update(this.editingTask.id, this.form.value).subscribe({
        next: () => this.saved.emit()
      });
    } else {
      this.taskSvc.create(this.form.value).subscribe({
        next: () => this.saved.emit()
      });
    }
  }
}

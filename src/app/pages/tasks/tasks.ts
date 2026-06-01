import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
})

export class Tasks {

  tasks: any[] = [];
  title = '';
  description = '';
  editing = false;
  edigitingId = 0;
  loading = false;
  success = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private service: TaskService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.service.getTasks().subscribe({
      next: (response => {
        this.tasks = response;
      }),
      error: () => {
        this.error = 'Failed to load tasks';
      }
    });
  }

  createTask() {

    if (!this.title.trim()) {
      alert('Ttile is required');
      return;
    }

    this.loading = true;
    this.clearMessages();

    this.service.createTask({
      title: this.title,
      description: this.description
    }).subscribe({

      next: () => {
        this.success = 'Task created';
        this.clearForm();
        this.loadTasks();
      }, error: () => {
        this.loading = false;
      }, complete: () => {
        this.loading = false;
      }
    });
  }

  editTask(task: any) {
    this.editing = true;
    this.edigitingId = task.id;
    this.title = task.title;
    this.description = task.description;
  }

  updateTask() {
    this.loading = true;
    this.clearMessages();

    this.service.updateTask(
      this.edigitingId,
      {
        title: this.title,
        description: this.description
      }
    ).subscribe({
      next: () => {
        this.success = 'Task updated';
        this.clearForm();
        this.loadTasks();
      }, error: () => {
        this.error = 'Update failed';
      }, complete: () => {
        this.loading = false;
      }
    });
  }

  clearMessages() {
    this.success = '';
    this.error = '';
  }

  cancelEdit() {
    this.clearForm();
  }

  clearForm() {
    this.editing = false;
    this.edigitingId = 0;
    this.title = '';
    this.description = '';
  }

  deleteTask(id: number) {

    const confirmed = confirm('Do you want to delete this task?');

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.clearMessages();

    this.service.deleteTask(id).subscribe({
      next: () => {
        this.success = 'Task deleted';
        this.loadTasks();
      }, 
      error: (err) => {
        this.error = 'Delete failed';
      }, complete: () => {
        this.loading = false;
      }
    })
  }

  logout() {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}

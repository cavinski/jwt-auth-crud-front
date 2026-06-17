import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskRequest } from '../../models/task-request';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})

export class Tasks {

  tasks: Task[] = [];
  title = '';
  description = '';
  editing = false;
  editingId = 0;
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

    this.loading = true;

    this.service.findAll().subscribe({
      
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.loading = false;
      },

      error: () => {
        this.loading = false;
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

    const task: TaskRequest = {
      title: this.title,
      description: this.description
    };

    this.service.create(task).subscribe({

      next: () => {
        this.showSuccess('Task created');
        this.clearForm();
        this.loadTasks();
      }, 
      
      error: () => {
        this.showError('Create failed');
        this.loading = false;
      }, 
      
      complete: () => {
        this.loading = false;
      }

    });
  }

  editTask(task: Task) {

    this.editing = true;
    this.editingId = task.id;
    this.title = task.title;
    this.description = task.description;
  }

  updateTask() {

    this.loading = true;
    this.clearMessages();

    const task: TaskRequest = {
      title: this.title,
      description: this.description
    };

    this.service.update(this.editingId, task).subscribe({

      next: () => {
        this.showSuccess('Task updated');
        this.clearForm();
        this.loadTasks();
      }, 
      
      error: () => {
        this.showError('Update failed');
      }, 
      
      complete: () => {
        this.loading = false;
      }

    });
  }

  deleteTask(id: number) {

    const confirmed = confirm('Do you want to delete this task?');

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.clearMessages();

    this.service.delete(id).subscribe({

      next: () => {
        this.showSuccess('Task deleted');
        this.loadTasks();
      }, 

      error: (err) => {
        this.showError('Delete failed');
      }, 
      
      complete: () => {
        this.loading = false;
      }

    })
  }

  showSuccess(message: string) {

    this.success = message;
    this.error = '';

    setTimeout(() => {

      this.success = '';

    }, 3000);

  }

  showError(message: string) {

    this.error = message;
    this.success = '';

    setTimeout(() => {

      this.error = '';

    }, 3000);

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
    this.editingId = 0;
    this.title = '';
    this.description = '';
  }

  logout() {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
})

export class Tasks {

  tasks: any[] = [];
  title = '';
  description = '';

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
      })
    });
  }

  createTask() {
    this.service.createTask({
      title: this.title,
      description: this.description
    }).subscribe({

      next: () => {
        this.title = '';
        this.description = '';
        this.loadTasks(); 
      }
    });
  }

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks;
      }
    })
  }

  logout() {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}

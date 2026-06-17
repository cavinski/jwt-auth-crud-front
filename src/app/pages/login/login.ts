import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    this.auth.login(this.email, this.password).subscribe({
      
      next: (response) => {

        this.errorMessage = '';
        this.auth.saveToken(response.token);
        this.router.navigate(['/tasks']);

      }, 

      error: () => {
        this.errorMessage = 'Invalid credentials';
      }

    });

  }

}

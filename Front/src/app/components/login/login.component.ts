import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {}

  submit() {
    this.auth.login(this.login, this.password).subscribe((ok) => {
      if (ok) {
        this.router.navigate(['/pollution/list']);
      } else {
        this.error = 'Identifiants invalides';
      }
    });
  }
}

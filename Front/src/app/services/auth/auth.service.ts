import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UsersService } from '../users/users.service';
import { User } from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );

  constructor(private usersService: UsersService) {}

  public login(login: string, password: string): Observable<boolean> {
    return this.usersService.getUsers().pipe(
      map((users) => {
        const found = users.find(
          (u) => u.login === login && u.password === password
        );
        if (found) {
          this.currentUser$.next(found);
          localStorage.setItem('currentUser', JSON.stringify(found));
          return true;
        }
        return false;
      })
    );
  }

  public logout(): void {
    this.currentUser$.next(null);
    localStorage.removeItem('currentUser');
  }

  public getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  public isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }
}

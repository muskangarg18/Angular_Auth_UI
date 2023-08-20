import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7013/api/User/';
  private loggedInUser: any; // Store user information here

  constructor(private http: HttpClient) {}

  signUp(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register`, userObj).pipe(
      catchError((error) => {
        console.error('Sign Up Error:', error);
        return throwError('An error occurred while signing up.');
      })
    );
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj).pipe(
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError('An error occurred while logging in.');
      })
    );
  }

  fetchLoggedInUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}getLoggedInUser`).pipe(
      catchError((error) => {
        console.error('Fetch Logged-In User Error:', error);
        return throwError('An error occurred while fetching logged-in user.');
      })
    );
  }
}

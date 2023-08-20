import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser: any; // Store the logged-in user's information

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Fetch logged-in user's information from the backend
    this.auth.fetchLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

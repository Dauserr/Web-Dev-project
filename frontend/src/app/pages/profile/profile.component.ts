import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userName = 'John Doe';
  userEmail = 'john@example.com';

  editProfile() {
    console.log('Redirect to edit profile page');
  }

  logout() {
    console.log('User logged out');
  }
}

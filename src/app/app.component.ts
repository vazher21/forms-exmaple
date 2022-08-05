import { Component } from '@angular/core';
import { RegisteredUser, User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users: RegisteredUser[] = [   ];

  selectedUser: RegisteredUser | null = null;
  showRegistrationForm: boolean = false;

  // Dom clicks.
  onAddClick() {
    this.showRegistrationForm = true;
    this.selectedUser = null;
  }
  onUpdateClick(id: string) {
    this.showRegistrationForm = false;
    this.selectedUser = this.users.find(
      (user) => user.id === id
    ) as RegisteredUser;
  }
  onDeleteClick(id: string) {
    if (confirm('delete?')) {
      this.delete(id);
    }
  }

  cancel(){
    this.showRegistrationForm = false;
    this.selectedUser = null;
  }

  // In real application those methods would be calling some sort of http methods.
  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    if (this.selectedUser?.id === id) {
      this.selectedUser = null;
    }
  }
  update(updatedUser: RegisteredUser) {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    console.log(index)
    this.users[index] = { ...updatedUser };
    this.selectedUser = null;
  }
  register(newUser: User) {
    this.users.push({ ...newUser, id: String(Math.random()) });
    this.showRegistrationForm = false;
  }
}

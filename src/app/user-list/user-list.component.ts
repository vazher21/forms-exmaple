import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegisteredUser } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: RegisteredUser[] = [ ];
  @Output() updateClick = new EventEmitter<string>();
  @Output() deleteClick = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onDeleteClick(id: string) {
    this.deleteClick.emit(id);
  }

  onEditClick(id: string) {
    this.updateClick.emit(id);
  }
}

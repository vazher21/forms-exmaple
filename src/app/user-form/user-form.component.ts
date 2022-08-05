import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { RegisteredUser, User, UserForm } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  _selectedUser: RegisteredUser | null = null;
  @Input() set selectedUser(user: RegisteredUser | null) {
    this.form.reset();
    this._selectedUser = user;
    if (user) {
      this.fillForm(user);
      this.terms.disable();
    } else {
      this.terms.enable();
    }
  }
  @Output() update = new EventEmitter<RegisteredUser>();
  @Output() register = new EventEmitter<User>();

  form = new FormGroup<UserForm>({
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nickName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    website: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    terms: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  fillForm(registeredUser: RegisteredUser): void {
    this.form.patchValue(registeredUser);
    this.confirmPassword.setValue(registeredUser.password);
  }

  readForm(): User | RegisteredUser {
    return {
      ...this._selectedUser,
      website: this.website.value,
      password: this.password.value,
      nickName: this.nickName.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value,
    };
  }

  submit(): void {
    this.selectedUser
      ? this.update.emit(this.readForm() as RegisteredUser)
      : this.register.emit(this.readForm() as User);
  }

  // Getters for form controls.
  private get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  private get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }
  private get nickName(): FormControl {
    return this.form.get('nickName') as FormControl;
  }
  private get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  private get website(): FormControl {
    return this.form.get('website') as FormControl;
  }
  private get phoneNumber(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }
  private get terms(): FormControl<boolean> {
    return this.form.get('terms') as FormControl<boolean>;
  }
}

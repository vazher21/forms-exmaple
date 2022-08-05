import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { RegisteredUser, User, UserForm } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from '../validators/password.validator';

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
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup<UserForm>({
    nickName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    website: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordGroup: new FormGroup({
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }, [matchValidator('password', 'confirmPassword')]),
    terms: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  fillForm(registeredUser: RegisteredUser): void {
    this.nickName.setValue(registeredUser.nickName);
    this.email.setValue(registeredUser.email);
    this.phoneNumber.setValue(registeredUser.phoneNumber);
    this.website.setValue(registeredUser.website);
    this.password.setValue(registeredUser.password);
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
    this._selectedUser
      ? this.update.emit(this.readForm() as RegisteredUser)
      : this.register.emit(this.readForm() as User);
  }

  onCancel(){
    this.cancel.emit();

  }

  // Getters for form controls.
  get passwordGroup(): FormGroup{
    return this.form.get('passwordGroup') as FormGroup;
  }
   get password(): FormControl {
    return this.passwordGroup.get('password') as FormControl;
  }
   get confirmPassword(): FormControl {
    return this.passwordGroup.get('confirmPassword') as FormControl;
  }
   get nickName(): FormControl {
    return this.form.get('nickName') as FormControl;
  }
   get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
   get website(): FormControl {
    return this.form.get('website') as FormControl;
  }
   get phoneNumber(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }
   get terms(): FormControl<boolean> {
    return this.form.get('terms') as FormControl<boolean>;
  }
}


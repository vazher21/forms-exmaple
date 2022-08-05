import {FormControl} from "@angular/forms";

export interface User{
  nickName: string;
  phoneNumber: string;
  email: string;
  password: string;
  website: string;
}

export interface RegisteredUser extends User{
  id: string;
}


export interface UserForm{
  nickName: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  website: FormControl<string>;
  terms: FormControl<boolean>;
}

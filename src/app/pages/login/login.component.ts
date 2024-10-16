import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomInputText } from '../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomPassword } from '../../models/custonsModels/CustomPasswordData/CustomPassword';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  getCustomInputUsername(): CustomInputText {
    return new CustomInputText('username', '', 'username', 'Username', 'username', false);
  }

  getCustomPassword(): CustomPassword {
    return new CustomPassword('password', 'password', false, 'Password');
  }

  getCustomButton(): CustomButton {
    return new CustomButton("Logar", true, 'w-full bg-indigo-600');
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.initForm();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomInputText } from '../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomPassword } from '../../models/custonsModels/CustomPasswordData/CustomPassword';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';
import { UtilsRepository } from '../../common/helpers/utilsRepository/UtilsRepository';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  getCustomInputUsername(): CustomInputText {
    return new CustomInputText('username', '', 'username', 'Username', 'username', false);
  }

  getCustomPassword(): CustomPassword {
    return new CustomPassword('password', 'password', false, 'Password');
  }

  getCustomButton(): CustomButton {
    return new CustomButton("Logar", true, 'w-full bg-indigo-600');
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message, life: 3000 });
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

  logar(): void {
    this.loading = true;
    if (this.form.valid) {

    } else {
      UtilsRepository.getRequiredFieldsInvalid(this.form);
      this.showMessage('error', 'Login', 'Por favor informe os campos obrigatórios');
      this.loading = false;
    }
  }
}

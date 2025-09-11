import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomInputText } from '../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomPassword } from '../../models/custonsModels/CustomPasswordData/CustomPassword';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';
import { UtilsRepository } from '../../common/helpers/utilsRepository/UtilsRepository';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private service: LoginService, private route: Router,
    private tokenService: TokenService) { }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter() {
    this.logar();
  }

  getCustomInputUsername(): CustomInputText {
    return new CustomInputText('username', '', 'username', 'Username', 'username', false, true, "");
  }

  getCustomPassword(): CustomPassword {
    return new CustomPassword('password', 'password', false, 'Password', false);
  }

  getCustomButton(): CustomButton {
    return new CustomButton("Logar", true, 'w-full bg-indigo-600', 'primary', '');
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: type, summary: title, detail: message, key: "trLogin", life: 3000 });
  }

  novoUsuario() {
    this.route.navigateByUrl('usuario/novo-usuario');
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
      let data = this.form.value;
      this.service.login(data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loading = false;

          if (response.authenticated) {
            this.showMessage('success', 'Login', `${response.message}`);
            this.tokenService.setToken(response.accessToken);
            this.tokenService.setItem('username', response.userName);
            this.tokenService.setItem('photo', response.photo ?? "");
            this.route.navigateByUrl('cliente/lista');
          } else {
            this.showMessage('error', 'Login', `${response.message}`);
          }


        },
        error: (error: any) => {
          this.loading = false;
          this.showMessage('error', 'Login', `${error.message}`);
        }
      })
    } else {
      UtilsRepository.getRequiredFieldsInvalid(this.form);
      this.showMessage('error', 'Login', 'Por favor informe os campos obrigatórios');
      this.loading = false;
    }
  }
}

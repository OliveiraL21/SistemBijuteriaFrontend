import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { CustomPassword } from '../../../models/custonsModels/CustomPasswordData/CustomPassword';
import { Router } from '@angular/router';
import { UtilsRepository } from '../../../common/helpers/utilsRepository/UtilsRepository';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrl: './novo-usuario.component.scss'
})
export class NovoUsuarioComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private messageService: MessageService) { }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter() {
    this.enviar();
  }

  getCustomInputUsername(): CustomInputText {
    return new CustomInputText('username', '', 'username', 'Username', 'username', false, true, "");
  }

  getCustomInputEmail(): CustomInputText {
    return new CustomInputText('email', '', 'exemplo@exemplo.com', 'email', 'E-mail', false, true, "");
  }

  getCustomPassword(): CustomPassword {
    return new CustomPassword('password', 'password', false, 'Password', false);
  }

  getCustomButton(): CustomButton {
    return new CustomButton("Cadastrar", true, 'w-full bg-indigo-600', 'primary', '');
  }

  login() {
    this.router.navigateByUrl('login');
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: type, summary: title, detail: message, key: "trLogin", life: 3000 });
  }

  enviar() {
    if (this.form.valid) {
      this.loading = true;
      let data = this.form.value;
      this.service.create(data).subscribe({
        next: (res) => {
          this.showMessage('success', 'Usuário', 'Usuário criado com sucesso!');
          this.router.navigateByUrl('login');
          this.loading = false;
        }, error: (err) => {
          this.loading = false;
        }
      });
    } else {
      UtilsRepository.getRequiredFieldsInvalid(this.form);
      this.showMessage('error', 'Login', 'Por favor informe os campos obrigatórios');
      this.loading = false;

    }
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.initForm();
  }
}

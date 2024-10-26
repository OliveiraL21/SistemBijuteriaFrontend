import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomPassword } from '../../../models/custonsModels/CustomPasswordData/CustomPassword';
import { TokenService } from '../../../services/token.service';
import Usuario from '../../../models/entityModels/usuario/Usuario';

@Component({
  selector: 'app-user-cadastro',
  templateUrl: './user-cadastro.component.html',
  styleUrl: './user-cadastro.component.scss'
})
export class UserCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private service: UserService, private router: Router, private activatedRouter: ActivatedRoute, private tokenService: TokenService) {

  }

  getUser() {
    let username = this.tokenService.getItem('username') ?? "";
    this.service.findByUsername(username).subscribe({
      next: (user: Usuario) => {
        this.loading = false;
        Object.keys(user).forEach((key: string) => {
          this.form.get(key)?.setValue(user[key as keyof Usuario]);
        })
      }
    })
  }

  showMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message, key: 'trp', life: 3000 });
  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'file',
        data: ""
      },
      {
        type: 'text',
        data: new CustomInputText('username', 'Informe o username', 'username', 'Username', 'username', false, true, "")
      },
      {
        type: 'text',
        data: new CustomInputText('email', 'Informe o e-mail', 'email', 'E-mail', 'email', false, true, "")
      },
      {
        type: 'password',
        data: new CustomPassword('password', 'password', false, 'Password', true),
      },
    ]
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity);
  }

  changeFile(base64: string) {
    console.log(base64);
    this.form.get('foto')?.setValue(base64);
  }

  submit() {
    console.log(this.form.value);
  }
  voltar() {
    this.router.navigateByUrl('cliente/lista');
  }

  initForm() {
    this.form = this.fb.group({
      foto: [null, null],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  ngOnInit() {
    this.initForm();
    this.getUser();
  }

}

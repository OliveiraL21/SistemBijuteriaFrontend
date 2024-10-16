import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { SelectComponent } from '../../components/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ImageModule } from 'primeng/image';



@NgModule({
  declarations: [
    InputTextComponent,
    SelectComponent,
    InputPasswordComponent,
    CustomButtonComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    InputMaskModule,
    InputIconModule,
    IconFieldModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    TableModule,
    CardModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    StyleClassModule,
    ImageModule,
  ],
  exports: [
    CommonModule,
    InputTextModule,
    InputMaskModule,
    InputIconModule,
    IconFieldModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    TableModule,
    CardModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextComponent,
    SelectComponent,
    InputPasswordComponent,
    CustomButtonComponent,
    StyleClassModule,
    ImageModule
  ]
})
export class SharedModule { }

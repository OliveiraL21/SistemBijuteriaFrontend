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
import { CustomToastComponent } from '../../components/toast/custom-toast/custom-toast.component';
import { BlockUI, BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MenuPrincipalComponent } from '../../components/menu/menu-principal/menu-principal.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';



@NgModule({
  declarations: [
    InputTextComponent,
    SelectComponent,
    InputPasswordComponent,
    CustomButtonComponent,
    CustomToastComponent,
    CustomTableComponent,
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
    ToastModule,
    BlockUIModule,
    ProgressSpinnerModule,
    HttpClientModule,
    MessageModule,
    RippleModule,
    MenuModule,
    PanelMenuModule,
    AvatarModule,
    AvatarGroupModule,
    TableModule,
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
    ImageModule,
    ToastModule,
    CustomToastComponent,
    BlockUIModule,
    ProgressSpinnerModule,
    HttpClientModule,
    MessageModule,
    RippleModule,
    MenuModule,
    PanelMenuModule,
    AvatarModule,
    AvatarGroupModule,
    TableModule,
    CustomTableComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }

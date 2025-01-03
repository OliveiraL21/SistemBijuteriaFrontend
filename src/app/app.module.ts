import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './common/shared/shared.module';
import { LoginModule } from "./pages/login/login.module";
import { MenuPrincipalModule } from './components/menu/menu-principal/menu-principal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticateInterceptor } from './common/helpers/interceptors/authenticateInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { errorInterceptor } from './common/helpers/interceptors/error.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MaletaListagemComponent } from './pages/maleta/maleta-listagem/maleta-listagem.component';
import { MaletaCadastroComponent } from './pages/maleta/maleta-cadastro/maleta-cadastro.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    MenuPrincipalModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthenticateInterceptor, { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true },
    errorInterceptor, { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true },
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

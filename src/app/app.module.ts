import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './common/shared/shared.module';
import { LoginModule } from "./pages/login/login.module";
import { MenuPrincipalModule } from './components/menu/menu-principal/menu-principal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticateInterceptor } from './common/helpers/interceptors/authenticateInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    AuthenticateInterceptor, { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

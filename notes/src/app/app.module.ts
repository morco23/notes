import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignInComponent } from './login-modal/sign-in/sign-in.component';
import { SignUpComponent } from './login-modal/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

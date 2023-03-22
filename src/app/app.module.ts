import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MessageService } from './shared/services/message.service';
import { ModalWindowService } from './shared/services/modal-window.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [   
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    MessageService,
    ModalWindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

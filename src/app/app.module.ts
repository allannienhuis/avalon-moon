import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxAvalonModule } from 'ngx-avalon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxAvalonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

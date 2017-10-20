import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ColorGuageModule } from 'ng2-gauge-with-color-band';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ColorGuageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

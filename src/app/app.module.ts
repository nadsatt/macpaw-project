import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JokesModule } from './jokes/jokes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JokesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

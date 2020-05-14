import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { JokeComponent } from './joke/joke.component';
import { JokeFormComponent } from './joke-form/joke-form.component';
import { JokesPageComponent } from './jokes-page/jokes-page.component';
import { SearchJokesHeaderComponent } from './search-jokes-header/search-jokes-header.component';
import { FavJokesHeaderComponent } from './fav-jokes-header/fav-jokes-header.component';
import { SearchJokesComponent } from './search-jokes/search-jokes.component';
import { FavJokesComponent } from './fav-jokes/fav-jokes.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    JokeFormComponent,
    JokesPageComponent,
    SearchJokesHeaderComponent,
    FavJokesHeaderComponent,
    SearchJokesComponent,
    FavJokesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

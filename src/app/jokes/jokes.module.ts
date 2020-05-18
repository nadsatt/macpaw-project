import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

import { JokeComponent } from './joke/joke.component';
import { JokeFormComponent } from './joke-form/joke-form.component';
import { JokesPageComponent } from './jokes-page/jokes-page.component';
import { SearchJokesHeaderComponent } from './search-jokes-header/search-jokes-header.component';
import { FavJokesHeaderComponent } from './fav-jokes-header/fav-jokes-header.component';
import { SearchJokesComponent } from './search-jokes/search-jokes.component';
import { FavJokesComponent } from './fav-jokes/fav-jokes.component';

@NgModule({
  declarations: [
    JokesPageComponent,
    SearchJokesComponent,
    SearchJokesHeaderComponent,
    JokeFormComponent,
    FavJokesHeaderComponent,
    FavJokesComponent,
    JokeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    JokesPageComponent
  ]
})

export class JokesModule { }

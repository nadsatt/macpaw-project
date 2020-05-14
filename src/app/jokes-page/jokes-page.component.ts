import { Component, OnInit, Renderer2 } from '@angular/core';
import { Joke } from '../_models/joke';
import { JokeService } from '../_services/joke.service';
import { SesssionStorageService } from '../_services/sesssion-storage.service';

@Component({
  selector: 'app-jokes-page',
  templateUrl: './jokes-page.component.html',
  styleUrls: ['./jokes-page.component.scss']
})

export class JokesPageComponent implements OnInit {

  jokes: Joke[]; 
  favJokes: Joke[]; 
  showFavJokes: boolean;

  constructor(private jokeService: JokeService,
    private storage: SesssionStorageService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.jokes = [];
    this.favJokes = this.storage.GetFavJokes();
    this.showFavJokes = false;
  }

  GetJokeByRandom(): void {
    this.jokeService.GetRandomJoke().subscribe({
      next: joke => this.jokes.unshift(joke),
      error: message => console.log(message)
    });
  }

  GetJokeByCategory(category: string): void {
    this.jokeService.GetRandomJokeByCategory(category).subscribe({
      next: joke => this.jokes.unshift(joke),
      error: message => console.log(message)
    });
  }

  GetJokesBySearch(search: string): void {
    this.jokeService.GetJokesBySearch(search).subscribe({
      next: jokes => this.jokes.unshift(...jokes),
      error: message => console.log(message)
    });
  }

  FavouriteJoke(favouritedJoke: Joke): void {
    this.storage.AddFavJoke(favouritedJoke);
    this.favJokes = this.storage.GetFavJokes();
  }

  UnfavouriteJoke(unfavouritedJoke: Joke): void {
    this.storage.RemoveFavJoke(unfavouritedJoke);
    this.favJokes = this.storage.GetFavJokes();
    
    if (this.jokes.findIndex(joke => joke.id === unfavouritedJoke.id) === -1){
      this.jokes.unshift(unfavouritedJoke);
    }
  }

  ShowFavJokes(): void {
    this.showFavJokes = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  HideFavJokes(): void {
    this.showFavJokes = false;
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }
}

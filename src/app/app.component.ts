import { Component, OnInit, EventEmitter, Renderer2 } from '@angular/core';
import { Joke } from 'src/app/_models/joke';
import { JokeService } from 'src/app/_services/joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public jokes: Joke[]; 
  public favJokes: Joke[]; 
  public showFavJokes: boolean;

  get sessionFavJokes(): Joke[] {
    let favJokes = [];
    if (sessionStorage.length > 0) {
      let sessionFavJokes = JSON.parse(sessionStorage.getItem('favJokes'));
      favJokes = Object.values(sessionFavJokes);
    }
    return favJokes;
  }
  set sessionFavJokes(favJokes: Joke[]) {
    let updFavJokes = {};
    if (favJokes.length > 0) {
      for (let favJoke of favJokes) {
        updFavJokes[favJoke.id] = favJoke;
      }
    }
    sessionStorage.setItem('favJokes', JSON.stringify(updFavJokes));
  }

  constructor(private jokeService: JokeService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.jokes = [];
    this.favJokes = this.sessionFavJokes;
    this.showFavJokes = false;
  }

  public GetJokeByRandom(): void {
    this.jokeService.GetRandomJoke().subscribe({
      next: joke => {
        this.jokes.unshift(joke);
      },
      error: err => console.error(err)
    });
  }

  public GetJokeByCategory(category: string): void {
    this.jokeService.GetRandomJokeByCategory(category).subscribe({
      next: joke => {
        this.jokes.unshift(joke);
      },
      error: err => console.error(err)
    });
  }

  public GetJokesBySearch(search: string): void {
    this.jokeService.GetJokesBySearch(search).subscribe({
      next: jokes => {
        this.jokes.unshift(...jokes.result);
      },
      error: err => console.error(err)
    });
  }

  public FavouriteJoke(favouritedJoke: Joke): void {
    let storedfavJokes = this.sessionFavJokes;
    storedfavJokes.unshift(favouritedJoke);
    this.sessionFavJokes = storedfavJokes;

    this.favJokes = this.sessionFavJokes;
  }

  public UnfavouriteJoke(unfavouritedJoke: Joke): void {
    let storedFavJokes = this.sessionFavJokes;
    storedFavJokes = storedFavJokes.filter(joke => joke.id !== unfavouritedJoke.id);
    this.sessionFavJokes = storedFavJokes;

    this.favJokes = this.sessionFavJokes;
    if (this.jokes.findIndex(joke => joke.id === unfavouritedJoke.id) === -1){
      this.jokes.unshift(unfavouritedJoke);
    }
  }

  public ShowFavJokes(): void {
    this.showFavJokes = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  public HideFavJokes(): void {
    this.showFavJokes = false;
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }
}


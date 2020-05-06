import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/app/_models/joke';
import { JokeService } from 'src/app/_services/joke.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public jokes: Joke[]; 
  public favJokes: Joke[]; 
  public categories: string[];
  public jokeForm: FormGroup;

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
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.jokes = [];
    this.favJokes = this.sessionFavJokes;
    this.categories = [];
    this.GetJokeCategories();
    this.jokeForm = this.fb.group({
      getJokeBy: 'getJokeByRandom',
      category: '',
      search: ''
    });
  }

  public GetJokeCategories(): void {
    this.jokeService.GetJokeCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.jokeForm.patchValue({'category': this.categories[0]});},
      error:  err => console.error(err)
    });
  }

  public SelectCategory(category: string): void {
    this.jokeForm.patchValue({'category': category});
  }

  public GetJoke(): void {
    if (this.jokeForm.get('getJokeBy').value === 'getJokeByRandom') {
      this.GetJokeByRandom();
    }
    else if (this.jokeForm.get('getJokeBy').value === 'getJokeByCategory') {
      let category = this.jokeForm.get('category').value;
      this.GetJokeByCategory(category);
    }
    else {
      let search = this.jokeForm.get('search').value;
      this.GetJokesBySearch(search);
    }
  }

  public GetJokeByRandom(): void {
    this.jokeService.GetRandomJoke().subscribe({
      next: joke => {
        this.jokes.push(joke);
      },
      error: err => console.error(err)
    });
  }

  public GetJokeByCategory(category: string): void {
    this.jokeService.GetRandomJokeByCategory(category).subscribe({
      next: joke => {
        this.jokes.push(joke);
      },
      error: err => console.error(err)
    });
  }

  public GetJokesBySearch(search: string): void {
    this.jokeService.GetJokesBySearch(search).subscribe({
      next: jokes => {this.jokes.push(...jokes.result)},
      error: err => console.error(err)
    });
  }

  public FavouriteJoke(favouritedJoke: Joke): void {
    let storedfavJokes = this.sessionFavJokes;
    storedfavJokes.push(favouritedJoke);
    this.sessionFavJokes = storedfavJokes;

    this.favJokes = this.sessionFavJokes;
    this.jokes = this.jokes.filter(joke => joke.id !== favouritedJoke.id);
  }

  public UnfavouriteJoke(unfavouritedJoke: Joke): void {
    let storedFavJokes = this.sessionFavJokes;
    storedFavJokes = storedFavJokes.filter(joke => joke.id !== unfavouritedJoke.id);
    this.sessionFavJokes = storedFavJokes;

    this.favJokes = this.sessionFavJokes;
    this.jokes.unshift(unfavouritedJoke);
  }
}


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

  get storedFavJokeIds(): string[] {
    let sessionFavJokeIds = JSON.parse(sessionStorage.getItem('favJokeIds'));
    return sessionFavJokeIds;
  }
  set storedFavJokeIds(updSessionFavJokeIds: string[]) {
    sessionStorage.setItem('favJokeIds', JSON.stringify(updSessionFavJokeIds));
  }

  public categories: string[];
  public jokeForm: FormGroup;

  constructor(private jokeService: JokeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.jokes = [];
    if (!this.storedFavJokeIds){
      this.storedFavJokeIds = [];
    }
    this.favJokes = this.GetStoredFavJokes();
    this.categories = [];
    this.GetJokeCategories();
    this.jokeForm = this.fb.group({
      getJokeBy: 'getJokeByRandom',
      category: '',
      search: ''
    });
  }

  public FavouriteJoke(favouritedJoke: Joke): void {
    let storedfavJokeIds = this.storedFavJokeIds;
    storedfavJokeIds.push(favouritedJoke.id);
    this.storedFavJokeIds = storedfavJokeIds

    sessionStorage.setItem(favouritedJoke.id, JSON.stringify(favouritedJoke));
    this.favJokes = this.GetStoredFavJokes();

    this.jokes = this.jokes.filter(joke => joke.id !== favouritedJoke.id);
  }

  public UnfavouriteJoke(unfavouritedJoke: Joke): void {
    let storedFavJokeIds = this.storedFavJokeIds;
    storedFavJokeIds = storedFavJokeIds.filter(jokeId => jokeId !== unfavouritedJoke.id);
    this.storedFavJokeIds = storedFavJokeIds;

    sessionStorage.removeItem(unfavouritedJoke.id);
    this.favJokes = this.GetStoredFavJokes();

    this.jokes.unshift(unfavouritedJoke);
  }

  public GetStoredFavJokes(): Joke[] {
    let favJokes = [];
    if (this.storedFavJokeIds.length > 0){
      for (let i = 0; i < this.storedFavJokeIds.length; i++){
        let id = this.storedFavJokeIds[i];
        let joke = JSON.parse(sessionStorage.getItem(id));
        favJokes.push(joke);
      }
    }
    return favJokes;
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
}

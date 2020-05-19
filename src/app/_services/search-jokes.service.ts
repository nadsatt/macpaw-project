import { Injectable } from '@angular/core';
import { Joke } from '../_models/joke';
import { BehaviorSubject } from 'rxjs';
import { FavJokesService } from './fav-jokes.service';

@Injectable({
  providedIn: 'root'
})

export class SearchJokesService {

  searchJokesSource = new BehaviorSubject<Joke[]>([]); 
  currentSearchJokes = this.searchJokesSource.asObservable();
    
  constructor(private favJokesService: FavJokesService) {}

  private PushUpdatedSearchJokes(updSearchJokes: Joke[]): void {
    this.searchJokesSource.next(updSearchJokes);
  }

  JokeInSearchJokes(joke: Joke): boolean {
    let searchJokes = this.searchJokesSource.value;
    let index = searchJokes.findIndex(searchJoke => searchJoke.id === joke.id);
    return index === -1 ? false : true;
  }

  JokeInFavJokes(joke: Joke): boolean {
    let favJokes = this.favJokesService.favJokesSource.value;
    let index = favJokes.findIndex(favJoke => favJoke.id === joke.id);
    return index === -1 ? false : true;
  }

  UpdateSearchJokesAfterFetchingJokes(...newJokes: Joke[]):void {
    let searchJokes = this.searchJokesSource.value;

    newJokes.forEach(newJoke => {
      if (!this.JokeInFavJokes(newJoke)) { 
        console.log('joke not in fav jokes');
        searchJokes.unshift(newJoke);  
      }
      else {
        console.log('joke in fav jokes');
        newJoke.isFavourite = true;
        searchJokes.unshift(newJoke);
      }
    });

    this.PushUpdatedSearchJokes(searchJokes);
  }

  UpdateSearchJokesAfterFavouritingJoke(favouritedJoke: Joke): void {
    let searchJokes = this.searchJokesSource.value;

    searchJokes.forEach(searchJoke => {
      if (searchJoke.id === favouritedJoke.id) {
        searchJoke.isFavourite = true;
      }
    });

    this.PushUpdatedSearchJokes(searchJokes);
  }

  UpdateSearchJokesAfterUnfavouritingJoke(unfavouritedJoke: Joke): void {
    let searchJokes = this.searchJokesSource.value;

    if(!this.JokeInSearchJokes(unfavouritedJoke)) { 
      unfavouritedJoke.isFavourite = false;
      searchJokes.unshift(unfavouritedJoke);
    }
    else {
      searchJokes.forEach(searchJoke => {
        if(searchJoke.id === unfavouritedJoke.id) {
          searchJoke.isFavourite = false;
        }
      })
    }

    this.PushUpdatedSearchJokes(searchJokes);
  }
}

import { Injectable } from '@angular/core';
import { Joke } from '../_models/joke';

@Injectable({
  providedIn: 'root'
})

export class SesssionStorageService {

  GetFavJokes(): Joke[] {
    let favJokes = [];
    if (sessionStorage.getItem('favJokes')) {
      let sessionFavJokes = JSON.parse(sessionStorage.getItem('favJokes'));
      favJokes = Object.values(sessionFavJokes);
    }
    return favJokes;
  }
  
  SetFavJokes(favJokes: Joke[]) {
    let updFavJokes = {};
    if (favJokes.length > 0) {
      for (let favJoke of favJokes) {
        updFavJokes[favJoke.id] = favJoke;
      }
    }
    sessionStorage.setItem('favJokes', JSON.stringify(updFavJokes));
  }

  AddFavJoke(favJoke: Joke): void {
    let favJokes = this.GetFavJokes();
    favJokes.unshift(favJoke);
    this.SetFavJokes(favJokes);
  }

  RemoveFavJoke(unfavJoke: Joke): void {
    let favJokes = this.GetFavJokes();
    favJokes = favJokes.filter(joke => joke.id !== unfavJoke.id);
    this.SetFavJokes(favJokes);
  }
}

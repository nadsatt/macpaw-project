import { Injectable } from '@angular/core';
import { Joke } from '../_models/joke';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FavJokesService {

  favJokesSource = new BehaviorSubject<Joke[]>(this.GetFavJokes()); 
  currentFavJokes = this.favJokesSource.asObservable();
  private _showFavJokes: boolean = false;
  get showFavJokes(): boolean {
    return this._showFavJokes;
  }

  ShowFavJokes(): void {
    this._showFavJokes = true;
  }

  HideFavJokes(): void {
    this._showFavJokes = false;
  }

  private GetFavJokes(): Joke[] {
    let favJokes = [];
    if (sessionStorage.getItem('favJokes')) {
      let sessionFavJokes = JSON.parse(sessionStorage.getItem('favJokes'));
      favJokes = Object.values(sessionFavJokes);
    }
    return favJokes;
  }
  
  private SetFavJokes(favJokes: Joke[]) {
    let updFavJokes = {};
    if (favJokes.length > 0) {
      for (let favJoke of favJokes) {
        updFavJokes[favJoke.id] = favJoke;
      }
    }
    sessionStorage.setItem('favJokes', JSON.stringify(updFavJokes));
  }

  private PushUpdatedFavJokes(updFavJokes: Joke[]): void {
    this.favJokesSource.next(updFavJokes);
  }

  UpdateFavJokesAfterFavouritingJoke(favouritedJoke: Joke): void {
    favouritedJoke.isFavourite = true;

    let favJokes = this.GetFavJokes();
    favJokes.unshift(favouritedJoke);
    this.SetFavJokes(favJokes);

    this.PushUpdatedFavJokes(favJokes);
  }

  UpdateFavJokesAfterUnfavouritingJoke(unfavouritedJoke: Joke): void {
    let favJokes = this.GetFavJokes();
    favJokes = favJokes.filter(favJoke => favJoke.id !== unfavouritedJoke.id);
    this.SetFavJokes(favJokes);

    this.PushUpdatedFavJokes(favJokes);
  }
}

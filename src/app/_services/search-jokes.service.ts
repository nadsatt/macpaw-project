import { Injectable } from '@angular/core';
import { Joke } from '../_models/joke';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchJokesService {

  private jokesSource = new BehaviorSubject<Joke[]>([]); // emits

  currentJokes = this.jokesSource.asObservable();
  
  constructor() { }
  
  UpdateJokes(...jokes) {
    let updJokes = this.jokesSource.value;
    updJokes.unshift(...jokes)
    this.jokesSource.next(updJokes);
  }

/*
  UpdateJokes(unfavouritedJoke): void {
    if (this.jokes.findIndex(joke => joke.id === unfavouritedJoke.id) === -1){
      this.jokes.unshift(unfavouritedJoke);
    }
  }
*/
}

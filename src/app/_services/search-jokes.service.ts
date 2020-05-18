import { Injectable } from '@angular/core';
import { Joke } from '../_models/joke';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchJokesService {

  private jokesSource = new BehaviorSubject<Joke[]>([]); 
  currentJokes = this.jokesSource.asObservable();
    
  private PushUpdatedJokes(updJokes: Joke[]): void {
    this.jokesSource.next(updJokes);
  }

  UpdateJokes(...newJokes: Joke[]): void {
    let jokes = this.jokesSource.value;

    if(newJokes.length === 1 && 
       jokes.findIndex(joke => joke.id === newJokes[0].id) === -1) {
      let newJoke = newJokes[0];
      jokes.unshift(newJoke);
    }
    if(newJokes.length > 1) {
      jokes.unshift(...newJokes);
    }

    this.PushUpdatedJokes(jokes);
  }
}

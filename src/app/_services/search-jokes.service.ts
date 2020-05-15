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

  UpdateJokes(...newJokes: Joke[]) {
    let jokes = this.jokesSource.value;
    jokes.unshift(...newJokes)
    
    this.PushUpdatedJokes(jokes);
  }
}

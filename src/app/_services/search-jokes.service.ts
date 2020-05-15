import { Injectable } from '@angular/core';
import { Joke } from '../_models/joke';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchJokesService {

  private jokesSource = new BehaviorSubject<Joke[]>([]); 
  currentJokes = this.jokesSource.asObservable();
  
  UpdateJokes(...jokes: Joke[]) {
    let updJokes = this.jokesSource.value;
    updJokes.unshift(...jokes)
    this.jokesSource.next(updJokes);
  }
}

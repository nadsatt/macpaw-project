import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Joke } from '../_models/joke';

@Injectable({
  providedIn: 'root'
})

export class JokeService {

  private apiJokeCategories: string = 'https://api.chucknorris.io/jokes/categories';
  private apiRandomJoke: string = 'https://api.chucknorris.io/jokes/random';
  private apiRandomJokeByCategory = 'https://api.chucknorris.io/jokes/random?category=';
  private apiJokesBySearch = 'https://api.chucknorris.io/jokes/search?query=';

  constructor(private http: HttpClient) { }

  public GetJokeCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiJokeCategories);
  }

  public GetRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.apiRandomJoke).pipe(
      map(joke => {
        joke.isFavourite = false;
        return joke;
      })
    );
  }

  public GetRandomJokeByCategory(category: string): Observable<Joke> {
    return this.http.get<Joke>(this.apiRandomJokeByCategory + category).pipe(
      map(joke => {
        joke.isFavourite = false;
        joke.fecthedByCategory = category;
        return joke;
      })
    );
  }

  public GetJokesBySearch(search: string): Observable<any> {
    return this.http.get<any>(this.apiJokesBySearch + search).pipe(
      tap(jokes => jokes.total > 0 ? jokes.result : [])
    );
  }
}

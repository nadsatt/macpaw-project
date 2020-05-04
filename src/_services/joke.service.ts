import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.get<Joke>(this.apiRandomJoke);
  }

  public GetRandomJokeByCategory(category: string): Observable<Joke> {
    return this.http.get<Joke>(this.apiRandomJokeByCategory + category);
  }

  public GetJokesBySearch(search: string): Observable<any> {
    return this.http.get<any>(this.apiJokesBySearch + search).pipe(
      catchError(err => {
        if (err.status.toString().startsWith('4')){
          console.log(err.status)
          return of('no jokes');
        }
        else {
          console.log('error')
          return throwError(err);
        }
      })
    );
  }
}

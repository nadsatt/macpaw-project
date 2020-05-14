import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Joke } from '../_models/joke';

@Injectable({
  providedIn: 'root'
})

export class JokeService {

  private api = 'https://api.chucknorris.io/jokes/';

  constructor(private http: HttpClient) { }

  GetJokeCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.api + 'categories');
  }

  GetRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.api + 'random').pipe(
      catchError(err => this.HandleError(err))
    );
  }

  GetRandomJokeByCategory(category: string): Observable<Joke> {
    return this.http.get<Joke>(this.api + 'random?category=' + category).pipe(
      map(joke => {
        joke.fetchedByCategory = category;
        return joke;
      }),
      catchError(err => this.HandleError(err))
    );
  }

  GetJokesBySearch(search: string): Observable<any> {
    return this.http.get<any>(this.api + 'search?query=' + search).pipe(
      map(jokes => jokes.result),
      catchError(err => {
        if (err.status === 400) {
          return of([]);
        }
        else {
          this.HandleError(err)
        }
      })
    );
  }

  HandleError(err) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.message}`;
    } else {
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}

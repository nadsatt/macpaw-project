import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Joke } from '../_models/joke';

@Injectable({
  providedIn: 'root'
})

export class JokeService {

  private api = 'https://api.chucknorris.io/jokes/';

  constructor(private http: HttpClient) { }

  GetJokeCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.api + 'categories').pipe(
      catchError(this.HandleError)
    );
  }

  GetRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.api + 'random').pipe(
      catchError(this.HandleError)
    );
  }

  GetRandomJokeByCategory(category: string): Observable<Joke> {
    return this.http.get<Joke>(this.api + 'random?category=' + category).pipe(
      map(joke => {
        joke.fetchedByCategory = category;
        return joke;
      }),
      catchError(this.HandleError)
    );
  }

  GetJokesBySearch(search: string): Observable<any> {
    return this.http.get<any>(this.api + 'search?query=' + search).pipe(
      map(jokes => jokes.result),
      catchError(this.HandleError)
    );
  }
  
  HandleError(err) {
    let errorMessage = '';
    if (err instanceof HttpErrorResponse) {
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    } else {
      errorMessage = `Error: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}

import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/app/_models/joke';
import { JokeService } from 'src/app/_services/joke.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public jokes: Joke[];

  get sessionJokes(): Joke[] {
    let sessionJokes = JSON.parse(sessionStorage.getItem('jokes'));
    return sessionJokes;
  }
  set sessionJokes(jokes: Joke[]) {
    sessionStorage.setItem('jokes', JSON.stringify(jokes));
  }

  public categories: string[];
  public jokeForm: FormGroup;

  constructor(private jokeService: JokeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.jokes = [];
    if (!this.sessionJokes) {
      this.sessionJokes = [];
    }
    this.categories = [];
    this.GetJokeCategories();
    this.jokeForm = this.fb.group({
      getJokeBy: 'getJokeByRandom',
      category: '',
      search: ''
    });
  }

  public GetJokeCategories(): void {
    this.jokeService.GetJokeCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.jokeForm.patchValue({'category': this.categories[0]});},
      error:  err => console.error(err)
    });
  }

  public SelectCategory(category: string): void {
    this.jokeForm.patchValue({'category': category});
  }

  public GetJoke(): void {
    if (this.jokeForm.get('getJokeBy').value === 'getJokeByRandom') {
      this.GetRandomJoke();
    }
    else if (this.jokeForm.get('getJokeBy').value === 'getJokeByCategory') {
      let category = this.jokeForm.get('category').value;
      this.GetRandomJokeByCategory(category);
    }
    else {
      let search = this.jokeForm.get('search').value;
      this.GetJokesBySearch(search);
    }
  }

  public GetRandomJoke(): void {
    this.jokeService.GetRandomJoke().subscribe({
      next: joke => {
        let updSessionJokes = this.sessionJokes;
        updSessionJokes.push(joke);
        this.sessionJokes = updSessionJokes;

        this.jokes = this.sessionJokes
      },
      error: err => console.error(err)
    });
  }

  public GetRandomJokeByCategory(category: string): void {
    this.jokeService.GetRandomJokeByCategory(category).subscribe({
      next: joke => {
        let updSessionJokes = this.sessionJokes;
        updSessionJokes.push(joke);
        this.sessionJokes = updSessionJokes;

        this.jokes = this.sessionJokes;
      },
      error: err => console.error(err)
    });
  }

  public GetJokesBySearch(search: string): void {
    this.jokeService.GetJokesBySearch(search).subscribe({
      next: jokes => {
        if (jokes.length > 0){
          let updSessionJokes = this.sessionJokes;     
          updSessionJokes.push(...jokes);
          this.sessionJokes = updSessionJokes;

          this.jokes = this.sessionJokes
        }
        else {
          console.log('no jokes for this text');
        }
      },
      error: err => console.error(err)
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JokeService } from '../../_services/joke.service';
import { SearchJokesService } from '../../_services/search-jokes.service';
import { Joke } from 'src/app/_models/joke';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.scss']
})

export class JokeFormComponent implements OnInit {

  categories: string[];
  jokeForm: FormGroup;
  displayMinLengthAlert: boolean;
  displayNoJokesAlert: boolean;

  get getJokeByVal(): string {
    return this.jokeForm.get('getJokeBy').value;
  }
  get categoryVal(): string {
    return this.jokeForm.get('category').value;
  }
  get submitDisabled(): boolean {
    return this.jokeForm.get('getJokeBy').value === 'getJokeBySearch' 
      && this.jokeForm.get('search').invalid;
  }

  constructor(private jokeService: JokeService,
    private searchJokesService: SearchJokesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categories = [];
    this.GetJokeCategories();
    this.displayMinLengthAlert = false;
    this.displayNoJokesAlert = false;

    this.jokeForm = this.fb.group({
      getJokeBy: 'getJokeByRandom',
      category: '',
      search: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.jokeForm.get('search').valueChanges.subscribe(value => {
      value.length > 0 && value.length < 3 ?
        this.displayMinLengthAlert = true : 
        this.displayMinLengthAlert = false;
      this.displayNoJokesAlert = false;
    })

    this.jokeForm.get('getJokeBy').valueChanges.subscribe(value => {
      this.jokeForm.patchValue({'search': ''});
      this.displayNoJokesAlert = false;
    });
  }

  GetJokeCategories(): void {
    this.jokeService.GetJokeCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.jokeForm.patchValue({'category': this.categories[0]});},
      error:  err => console.error(err)
    });
  }

  SelectCategory(category: string): void {
    this.jokeForm.patchValue({'category': category});
  }

  GetJoke(): void {
    if (this.jokeForm.get('getJokeBy').value === 'getJokeByRandom') {
      this.GetJokeByRandom();
    }
    else if (this.jokeForm.get('getJokeBy').value === 'getJokeByCategory') {
      let category = this.jokeForm.get('category').value;
      this.GetJokeByCategory(category);
    }
    else {
      let search = this.jokeForm.get('search').value;
      this.GetJokesBySearch(search);
    }
  }

  UpdateJokes(...jokes: Joke[]): void {
    this.searchJokesService.UpdateSearchJokesAfterFetchingJokes(...jokes);
  }

  GetJokeByRandom(): void {
    this.jokeService.GetRandomJoke().subscribe({
      next: joke => this.UpdateJokes(joke),
      error: message => console.log(message)
    });
  }

  GetJokeByCategory(category: string): void {
    this.jokeService.GetRandomJokeByCategory(category).subscribe({
      next: joke => this.UpdateJokes(joke),
      error: message => console.log(message)
    });
  }

  GetJokesBySearch(search: string): void {
    this.jokeService.GetJokesBySearch(search).subscribe({
      next: jokes => jokes.length > 0 ? 
        this.UpdateJokes(...jokes) : 
        this.displayNoJokesAlert = true,
      error: message => console.log(message)
    });
  }
}

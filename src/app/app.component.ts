import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/_models/joke';
import { JokeService } from 'src/_services/joke.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { strict } from 'assert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  public jokes: Joke[];
  public categories: string[];
  public jokeForm: FormGroup;

  constructor(private jokeService: JokeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.jokes = [];
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
    console.log('clicked')
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
      next: joke => this.jokes.push(joke),
      error: err => console.error(err)
    });
  }

  public GetRandomJokeByCategory(category: string): void {
    this.jokeService.GetRandomJokeByCategory(category).subscribe({
      next: joke => this.jokes.push(joke),
      error: err => console.error(err)
    });
  }

  public GetJokesBySearch(search: string): void {
    this.jokeService.GetJokesBySearch(search).subscribe({
      next: jokes => {
        if (jokes.isArray){
          this.jokes.push(...jokes.result);
        }
        else {
          console.log(jokes);
        }
      },
      error: err => console.error(err)
    });
  }
}


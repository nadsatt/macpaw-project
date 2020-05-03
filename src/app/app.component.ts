import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/_models/joke';
import { JokeService } from 'src/_services/joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  public jokes: Joke[];
  public categories: string[];
  public category: string;
  public text: string;

  constructor(private jokeService: JokeService) { }

  ngOnInit(): void {
    this.jokes = [];
    this.categories = [];
    this.category = '';
    this.text = '';
    this.GetJokeCategories();
  }

  public GetJokeCategories(): void {
    this.jokeService.GetJokeCategories().subscribe({
      next: categories => this.categories = categories,
      error:  err => console.error(err)
    });
  }

  public GetRandomJoke(): void {
    this.jokeService.GetRandomJoke().subscribe({
      next: joke => this.jokes.push(joke),
      error: err => console.error(err)
    });
  }

  public GetRandomJokeByCategory(): void {
    this.jokeService.GetRandomJokeByCategory(this.category).subscribe({
      next: joke => this.jokes.push(joke),
      error: err => console.error(err)
    });
  }

  public GetJokesByText(): void {
    this.jokeService.GetJokesByText(this.text).subscribe({
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


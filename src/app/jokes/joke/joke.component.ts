import { Component, OnInit, Input } from '@angular/core';
import { Joke } from '../../_models/joke';
import { FavJokesService } from '../../_services/fav-jokes.service';
import { SearchJokesService } from 'src/app/_services/search-jokes.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})

export class JokeComponent implements OnInit {

  @Input() joke: Joke;
  @Input() jokeFromFavJokes: boolean;
  lastUpdate: number;

  constructor(private favJokesService: FavJokesService,
    private searchJokesService: SearchJokesService) { }

  ngOnInit(): void {
    if (this.joke) {
      this.lastUpdate = this.CalculateLastUpdate(this.joke.created_at, Date.now());
    }
  }

  CalculateLastUpdate(creationDate: string, currentDate: number): number {
    let lastUpdate = Math.floor((currentDate - Date.parse(creationDate))/ 3600000);
    return lastUpdate;
  }

  Favourite(): void {
    this.joke.isFavourite = true;
    this.favJokesService.AddFavJoke(this.joke);
  }

  Unfavourite(): void {
    this.joke.isFavourite = false;
    this.favJokesService.RemoveFavJoke(this.joke);
    this.searchJokesService.UpdateJokes(this.joke);
  }
}

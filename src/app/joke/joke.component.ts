import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from '../_models/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})

export class JokeComponent implements OnInit {

  @Input() joke: Joke;
  @Input() jokeFromFavJokes: boolean;
  @Output() jokeFavourited: EventEmitter<Joke> = new EventEmitter<Joke>();
  @Output() jokeUnfavourited: EventEmitter<Joke> = new EventEmitter<Joke>();
  lastUpdate: number;

  constructor() { }

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
    this.jokeFavourited.emit(this.joke);
  }

  Unfavourite(): void {
    this.joke.isFavourite = false;
    this.jokeUnfavourited.emit(this.joke);
  }
}

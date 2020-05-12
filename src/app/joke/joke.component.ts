import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from '../_models/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})

export class JokeComponent implements OnInit {

  @Input() public joke: Joke;
  @Input() public jokeFromFavJokes: boolean;
  @Output() public jokeFavourited: EventEmitter<Joke> = new EventEmitter<Joke>();
  @Output() public jokeUnfavourited: EventEmitter<Joke> = new EventEmitter<Joke>();
  public lastUpdate: number;

  constructor() { }

  ngOnInit(): void {
    if (this.joke) {
      this.lastUpdate = this.CalculateLastUpdate(this.joke.created_at, Date.now());
    }
  }

  public CalculateLastUpdate(creationDate: string, currentDate: number): number {
    let lastUpdate = Math.floor((currentDate - Date.parse(creationDate))/ 3600000);
    return lastUpdate;
  }

  public Favourite(): void {
    this.joke.isFavourite = true;
    this.jokeFavourited.emit(this.joke);
  }

  public Unfavourite(): void {
    this.joke.isFavourite = false;
    this.jokeUnfavourited.emit(this.joke);
  }
}

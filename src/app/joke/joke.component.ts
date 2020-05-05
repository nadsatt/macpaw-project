import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from '../_models/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})

export class JokeComponent implements OnInit {

  @Input() public joke: Joke;
  @Output() public jokeFavourited: EventEmitter<Joke> = new EventEmitter<Joke>();
  @Output() public jokeUnfavourited: EventEmitter<Joke> = new EventEmitter<Joke>();
  public lastUpdate: number;

  constructor() { }

  ngOnInit(): void {
    this.CalculateLastUpdate();
  }

  private CalculateLastUpdate(): void {
    this.lastUpdate = this.joke.updated_at ? Math.floor((Date.now() - Date.parse(this.joke.updated_at))/ 3600000): null;
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

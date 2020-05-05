import { Component, OnInit, Input} from '@angular/core';
import { Joke } from '../_models/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})

export class JokeComponent implements OnInit {

  @Input() joke: Joke;
  public lastUpdate: number;

  constructor() { }

  ngOnInit(): void {
    this.lastUpdate = this.CalculateLastUpdate(this.joke.updated_at);
    console.log('initiated');
  }

  private CalculateLastUpdate(updatedAt: string): number {
    let lastUpdate = Math.floor((Date.now() - Date.parse(updatedAt))/ 3600000);
    return lastUpdate;
  }

  public ToggleFavourite(): void {
    this.joke.isFavourite = !this.joke.isFavourite;
  }
}

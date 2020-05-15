import { Component, OnInit } from '@angular/core';
import { Joke } from '../../_models/joke';
import { FavJokesService } from '../../_services/fav-jokes.service';

@Component({
  selector: 'app-fav-jokes',
  templateUrl: './fav-jokes.component.html',
  styleUrls: ['./fav-jokes.component.scss']
})

export class FavJokesComponent implements OnInit {

  favJokes: Joke[];
  
  constructor(public favJokesService: FavJokesService) { }

  ngOnInit(): void {
    this.favJokesService.currentFavJokes.subscribe({
      next: favJokes => this.favJokes = favJokes
    });
  }
}

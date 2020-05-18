import { Component, OnInit } from '@angular/core';
import { Joke } from '../../_models/joke';
import { SearchJokesService } from '../../_services/search-jokes.service';

@Component({
  selector: 'app-search-jokes',
  templateUrl: './search-jokes.component.html',
  styleUrls: ['./search-jokes.component.scss']
})

export class SearchJokesComponent implements OnInit {

  jokes: Joke[]; 

  constructor(private searchJokesService: SearchJokesService) { }

  ngOnInit(): void {
   this.SubscribeToJokesSource();
  }

  SubscribeToJokesSource(): void {
    this.searchJokesService.currentJokes.subscribe({
      next: jokes => this.jokes = jokes
    });
  }
}

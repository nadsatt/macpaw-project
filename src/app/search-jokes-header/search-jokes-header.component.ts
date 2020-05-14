import { Component, Renderer2 } from '@angular/core';
import { FavJokesService } from '../_services/fav-jokes.service';

@Component({
  selector: 'app-search-jokes-header',
  templateUrl: './search-jokes-header.component.html',
  styleUrls: ['./search-jokes-header.component.scss']
})

export class SearchJokesHeaderComponent {

  constructor(private favJokesService: FavJokesService,
    private renderer:  Renderer2) { }

  ShowFavJokes(): void {
    this.favJokesService.ShowFavJokes();
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }
}

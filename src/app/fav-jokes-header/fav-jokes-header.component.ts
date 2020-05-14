import { Component, Renderer2 } from '@angular/core';
import { FavJokesService } from '../_services/fav-jokes.service';

@Component({
  selector: 'app-fav-jokes-header',
  templateUrl: './fav-jokes-header.component.html',
  styleUrls: ['./fav-jokes-header.component.scss']
})
export class FavJokesHeaderComponent {

  constructor(private favJokesService: FavJokesService,
    private renderer: Renderer2) { }

  HideFavJokes(): void {
    this.favJokesService.HideFavJokes();
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }
}

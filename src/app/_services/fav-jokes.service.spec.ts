import { TestBed } from '@angular/core/testing';

import { FavJokesService } from './fav-jokes.service';

describe('SesssionStorageService', () => {
  let service: FavJokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavJokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SearchJokesService } from './search-jokes.service';

xdescribe('DataService', () => {
  let service: SearchJokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchJokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

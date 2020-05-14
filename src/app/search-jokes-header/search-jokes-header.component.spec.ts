import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJokesHeaderComponent } from './search-jokes-header.component';

describe('SearchJokesHeaderComponent', () => {
  let component: SearchJokesHeaderComponent;
  let fixture: ComponentFixture<SearchJokesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJokesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJokesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

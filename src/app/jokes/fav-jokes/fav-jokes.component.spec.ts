import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavJokesComponent } from './fav-jokes.component';

describe('FavJokesComponent', () => {
  let component: FavJokesComponent;
  let fixture: ComponentFixture<FavJokesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavJokesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

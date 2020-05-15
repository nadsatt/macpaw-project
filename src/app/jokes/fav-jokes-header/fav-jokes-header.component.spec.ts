import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavJokesHeaderComponent } from './fav-jokes-header.component';

describe('FavJokesHeaderComponent', () => {
  let component: FavJokesHeaderComponent;
  let fixture: ComponentFixture<FavJokesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavJokesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavJokesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

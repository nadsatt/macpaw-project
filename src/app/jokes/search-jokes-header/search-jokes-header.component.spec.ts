import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchJokesHeaderComponent } from './search-jokes-header.component';
import { FavJokesService } from 'src/app/_services/fav-jokes.service';
import { By } from '@angular/platform-browser';

describe('SearchJokesHeaderComponent', () => {
  let component: SearchJokesHeaderComponent;
  let fixture: ComponentFixture<SearchJokesHeaderComponent>;
  let favJokesServiceSpy: {'ShowFavJokes': jasmine.Spy};

  beforeEach(async(() => {
    favJokesServiceSpy = jasmine.createSpyObj('FavJokesService', ['ShowFavJokes']);
    TestBed.configureTestingModule({
      declarations: [ SearchJokesHeaderComponent ],
      providers: [
        { provide: FavJokesService, useValue: favJokesServiceSpy }
      ]
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

  describe('ShowFavJokes', () => {
    it('should execute "ShowFavJokes" method of favJokesService', () => {
      // act
      component.ShowFavJokes();

      // assert
      expect(favJokesServiceSpy.ShowFavJokes).toHaveBeenCalled();
    })
  })

  describe('template', () => {
    it('should call "ShowFavJokes" method after click on search jokes header icon', () => {
     // arrange && act 
     const onClickMock = spyOn(component, 'ShowFavJokes');
     fixture.debugElement.query(By.css('.search-jokes-header__icon svg')).triggerEventHandler('click', null);
     
     // assert
     expect(onClickMock).toHaveBeenCalled();
    })
  })
});

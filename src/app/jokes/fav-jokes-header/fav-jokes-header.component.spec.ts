import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FavJokesHeaderComponent } from './fav-jokes-header.component';
import { FavJokesService } from 'src/app/_services/fav-jokes.service';
import { By } from '@angular/platform-browser';

xdescribe('FavJokesHeaderComponent', () => {
  let component: FavJokesHeaderComponent;
  let fixture: ComponentFixture<FavJokesHeaderComponent>;
  let favJokesServiceSpy: {'HideFavJokes': jasmine.Spy};

  beforeEach(async(() => {
    favJokesServiceSpy = jasmine.createSpyObj('FavJokesService', ['HideFavJokes']);
    TestBed.configureTestingModule({
      declarations: [ FavJokesHeaderComponent ],
      providers: [
        { provide: FavJokesService, useValue: favJokesServiceSpy }
      ]
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

  describe('HideFavJokes', () => {
    it('should execute "HideFavJokes" method of favJokesService', () => {
      // arrange

      // act
      component.HideFavJokes();

      // assert
      expect(favJokesServiceSpy.HideFavJokes).toHaveBeenCalled();
    })
  })

  describe('template', () => {
    it('should call "HideFavJokes" method after click on fav jokes header icon', () => {
     // arrange && act 
     const onClickMock = spyOn(component, 'HideFavJokes');
     fixture.debugElement.query(By.css('svg.fav-jokes-header__icon')).triggerEventHandler('click', null);
     
     // assert
     expect(onClickMock).toHaveBeenCalled();
    })
  })
});

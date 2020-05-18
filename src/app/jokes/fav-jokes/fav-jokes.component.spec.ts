import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FavJokesComponent } from './fav-jokes.component';
import { FavJokesService } from 'src/app/_services/fav-jokes.service';

describe('FavJokesComponent', () => {
  let component: FavJokesComponent;
  let fixture: ComponentFixture<FavJokesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavJokesComponent ],
      providers: [ FavJokesService
      ]
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

  describe('ngOnInit', () => {
    it('should execute "SubscribeToFavJokesSource" method', () => {
      // arrange
      spyOn(component, 'SubscribeToFavJokesSource');

      // act
      component.ngOnInit();

      // assert
      expect(component.SubscribeToFavJokesSource).toHaveBeenCalled();
    })
  })

  describe('template', () => {
    it('should display jokes list if jokes available', () => {
      // arrange && act
      component.favJokes = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        }
      ];
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.fav-jokes__list')).toBeInstanceOf(HTMLDivElement);
    })

    it('should should not display jokes list if no jokes available', () => {
      // arrange && act
      component.favJokes = [];
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.fav-jokes__list')).toBe(null);
    })
  })
});

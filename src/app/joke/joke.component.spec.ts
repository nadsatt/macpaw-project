import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JokeComponent } from './joke.component';
import { JokeService } from '../_services/joke.service';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;

    component.joke = {
      categories:[],
      created_at:"2020-01-05 13:42:21.179347",
      icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
      id:"R6Xy80fUSyW7Cr3RfmHpbQ",
      updated_at:"2020-01-05 13:42:21.179347",
      url:"https://api.chucknorris.io/jokes/R6Xy80fUSyW7Cr3RfmHpbQ",
      value:"Chuck Norris made Jack jump",
      isFavourite: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    // assert
    expect(component).toBeTruthy();
  });

  it('should define "lastUpdate" var after ngOnInit', () => {
    // act
    component.ngOnInit();

    // assert
    expect(component.lastUpdate).toBeDefined;
  })

  describe('CalculateLastUpdate', () => {
    it('should return diff between current and creation date in hours', () => {
      // arrange
      let currentDate = 1589272272354;
      let creationDate = component.joke.created_at;
      let expected = 3068;

      // act
      let actual = component.CalculateLastUpdate(creationDate, currentDate);

      // assert
      expect(actual).toEqual(expected);
    })
  })

  describe('Favourite', () => {
    it ('should modify "isFavourite" jokes property to true', () => {
      // arrange
      component.joke.isFavourite = false;

      // act
      component.Favourite();

      // assert
      expect(component.joke.isFavourite).toBeTrue;
    })

    it ('should emit "jokeFavourited" event with joke', () => {
      // arrange
      let actual;
      component.jokeFavourited.subscribe($event => {
        actual = $event;
      })
      // act
      component.Favourite();

      // assert
      expect(actual).toEqual(component.joke);
    })
  })

  describe('Unfavourite', () => {
    it ('should modify "isFavourite" jokes property to false', () => {
      // arrange
      component.joke.isFavourite = true;
      
      // act
      component.Unfavourite();

      // assert
      expect(component.joke.isFavourite).toBeFalse;
    })

    it ('should emit "jokeUnfavourited" event with joke', () => {
      // arrange
      let actual;
      component.jokeUnfavourited.subscribe($event => {
        actual = $event;
      })
      // act
      component.Unfavourite();

      // assert
      expect(actual).toEqual(component.joke);
    })
  })
});


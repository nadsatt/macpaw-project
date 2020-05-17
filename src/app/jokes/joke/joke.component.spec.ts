import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JokeComponent } from './joke.component';
import { By } from '@angular/platform-browser';
import { FavJokesService } from 'src/app/_services/fav-jokes.service';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;
  let favJokesServiceSpy: {'AddFavJoke', 'RemoveFavJoke': jasmine.Spy};

  beforeEach(async(() => {
    favJokesServiceSpy = jasmine.createSpyObj('FavJokesService', 
      ['AddFavJoke', 'RemoveFavJoke']);
    TestBed.configureTestingModule({
      declarations: [ JokeComponent ],
      providers: [
        { provide: FavJokesService, useValue: favJokesServiceSpy }
      ]
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
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should execute "CalculateLastUpdate" method', () => {
      // arrange
      spyOn(component, 'CalculateLastUpdate');

      // act
      component.ngOnInit();
      
      // assert
      expect(component.CalculateLastUpdate).toHaveBeenCalled();
    })
    it('should define "lastUpdate" var', () => {
      // act
      component.ngOnInit();
  
      // assert
      expect(component.lastUpdate).toBeInstanceOf(Number);
    })
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
    it('should change joke "isFavourite" property to true', () => {
      // arrange
      component.joke.isFavourite = false;

      // act
      component.Favourite();

      // assert
      expect(component.joke.isFavourite).toEqual(true);
    })

    it('should call "AddFavJoke" method of FavJokesService with joke as arg', () => {
      // arrange
      favJokesServiceSpy.AddFavJoke.and.callFake((joke) => {});

      // act
      component.Favourite();

      // assert
      expect(favJokesServiceSpy.AddFavJoke).toHaveBeenCalled();
      expect(favJokesServiceSpy.AddFavJoke).toHaveBeenCalledWith(component.joke);
    })
  })

  describe('Unfavourite', () => {
    it('should change joke "isFavourite" property to false', () => {
      // arrange
      component.joke.isFavourite = true;

      // act
      component.Unfavourite();

      // assert
      expect(component.joke.isFavourite).toEqual(false);
    })


    it('should call "RemoveFavJoke" method of FavJokesService with joke as arg', () => {
      // arrange
      favJokesServiceSpy.RemoveFavJoke.and.callFake((joke) => {});

      // act
      component.Unfavourite();

      // assert
      expect(favJokesServiceSpy.RemoveFavJoke).toHaveBeenCalled();
      expect(favJokesServiceSpy.RemoveFavJoke).toHaveBeenCalledWith(component.joke);
    })
  })

  describe('template', () => {
    it ('should not render if "joke" var undefined', () => {
      // arrange && act
      component.joke = null;
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.joke')).toBe(null);
    })

    it ('should render if "joke" var defined', () => {
      // assert
      expect(fixture.nativeElement).toBeInstanceOf(HTMLDivElement);
      expect(fixture.nativeElement.querySelector('.joke__link-content').textContent).toContain(component.joke.id);
      expect(fixture.debugElement.query(By.css('.joke__link-content a')).nativeElement.getAttribute('href')).toEqual(component.joke.url);
      expect(fixture.nativeElement.querySelector('.joke__value').textContent).toContain(component.joke.value);
      expect(fixture.nativeElement.querySelector('.joke__last-update').textContent).toContain(component.lastUpdate);
    })

    it('should render category if joke is from search jokes && fetched by category', () => {
      // arrange && act
      component.jokeFromFavJokes = false;
      component.joke.isFavourite = false;
      component.joke.fetchedByCategory = 'any';
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.joke__category').textContent).toContain(component.joke.fetchedByCategory);
    })

    it('should not render category if joke is from fav jokes', () => {
      // arrange && act
      component.jokeFromFavJokes = true;
      component.joke.isFavourite = true;
      component.joke.fetchedByCategory = "any";
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.joke__category')).toBe(null);
    })

    it('should not render category if joke is not fetched by category', () => {
      // arrange && act
      component.jokeFromFavJokes = false;
      component.joke.fetchedByCategory = undefined;
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.joke__category')).toBe(null);
    })

    it('should render static fav-icon if joke from fav jokes', () => {
      // arrange && act
      component.jokeFromFavJokes = true;
      component.joke.isFavourite = true;
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.fav-joke__fav-icon')).toBeInstanceOf(HTMLDivElement);
      expect(fixture.nativeElement.querySelector('.search-joke__fav-icon')).toBe(null);
    })

    it('should render clickable fav-icon if joke from search jokes', () => {
      // arrange && act
      component.jokeFromFavJokes = false;
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.search-joke__fav-icon')).toBeInstanceOf(HTMLDivElement);
      expect(fixture.nativeElement.querySelector('.fav-joke__fav-icon')).toBe(null);
    })
  
    it('should render empty clickable fav-icon if joke from search jokes is unfavourited', () => {
      // arrange && act
      component.jokeFromFavJokes = false;
      component.joke.isFavourite = false;
      fixture.detectChanges();
  
      // assert
      expect(fixture.nativeElement.querySelector('.joke__fav-icon--unfavourited')).toBeInstanceOf(SVGElement);
      expect(fixture.nativeElement.querySelector('.joke__fav-icon--favourited')).toBe(null);
    })

    it('should render filled clickable fav-icon if joke from search jokes is favourited', () => {
      // arrange && act
      component.jokeFromFavJokes = false;
      component.joke.isFavourite = true;
      fixture.detectChanges();
  
      // assert
      expect(fixture.nativeElement.querySelector('.joke__fav-icon--favourited')).toBeInstanceOf(SVGElement);
      expect(fixture.nativeElement.querySelector('.joke__fav-icon--unfavourited')).toBe(null);
    })

   it('should call "Favourite" method after click on empty clickable fav-icon', () => {
     // arrange
     component.jokeFromFavJokes = false;
     component.joke.isFavourite = false;
     fixture.detectChanges();

     // act 
     const onClickMock = spyOn(component, 'Favourite');
     fixture.debugElement.query(By.css('svg.joke__fav-icon--unfavourited')).triggerEventHandler('click', null);
     
     // assert
     expect(onClickMock).toHaveBeenCalled();
   })

   it('should call "Unfavourite" method after click on filled clickable fav-icon', () => {
    // arrange
    component.jokeFromFavJokes = false;
    component.joke.isFavourite = true;
    fixture.detectChanges();

    // act 
    const onClickMock = spyOn(component, 'Unfavourite');
    fixture.debugElement.query(By.css('svg.joke__fav-icon--favourited')).triggerEventHandler('click', null);
    
    // assert
    expect(onClickMock).toHaveBeenCalled();
   })
  })
});


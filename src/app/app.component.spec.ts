import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokeService } from './_services/joke.service';
import { Joke } from './_models/joke';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  let jokeServiceSpy: { 
    'GetJokeCategories', 
    'GetRandomJoke',
    'GetJokeByCategory',
    'GetJokesBySearch': jasmine.Spy 
  };
  let getterSpy: jasmine.Spy;
  let setterSpy: jasmine.Spy;

  beforeEach(async(() => {
    jokeServiceSpy = jasmine.createSpyObj('JokeService', [
      'GetJokeCategories', 
      'GetRandomJoke',
      'GetJokeByCategory',
      'GetJokesBySearch'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: JokeService, useValue: jokeServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    getterSpy = spyOnProperty(component, 'sessionFavJokes', 'get');
    setterSpy = spyOnProperty(component, 'sessionFavJokes', 'set');
  })

  it('should create the app', () => {
    // assert
    expect(component).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('should initialize empty "jokes" array', () => {
      // act
      component.ngOnInit();
  
      // assert
      expect(component.jokes).toEqual([]);
    })
  
    it('should execute getter and initialize "favJokes" array', () => {
      // arrange
      getterSpy.and.returnValue([]);

      // act
      component.ngOnInit();
  
      // assert
      expect(getterSpy).toHaveBeenCalled();
      expect(component.jokes).toBeInstanceOf(Array);
    })

    it('should initialize "favJokes" array as empty if session storage empty', () => {
      // arrange
      getterSpy.and.returnValue([]);

      // act
      component.ngOnInit();
  
      // assert
      expect(component.favJokes).toEqual([]);
    })

    it('should initialize "favJokes" array as non-epmty if session storage non-empty', () => {
      // arrange
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      getterSpy.and.returnValue([joke]);

      // act
      component.ngOnInit();
  
      // assert
      expect(component.favJokes).toEqual([joke]);
    })

    it('should initialize "showFavJokes" as false', () => {
      // act
      component.ngOnInit();
  
      // assert
      expect(component.showFavJokes).toEqual(false);
    })
  })

  describe('sessionFavJokes getter', () => {
    // due to inability to mock 'sessionStorage' variable in getter,
    // getter's code tested here as function
    beforeEach(() => {
      let storage: Object = {};

      spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string) => {
        storage[key] = value;
      });

      spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
        return storage[key] || "{}";
      });

      spyOn(sessionStorage, 'clear').and.callFake(() => {
        storage = {};
      });

      spyOnProperty(sessionStorage, 'length').and.returnValue(Object.keys(storage) ? 1 : 0);
    })

    it('should return array of jokes if session storage containes jokes', () => {
      // arrange
      let GetSessionFavJokes = (): Joke[] => {
        let favJokes = [];
        if (sessionStorage.getItem('favJokes')) {
          let sessionFavJokes = JSON.parse(sessionStorage.getItem('favJokes'));
          favJokes = Object.values(sessionFavJokes);
        }
        return favJokes;
      }
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      sessionStorage.clear();
      sessionStorage.setItem('favJokes', JSON.stringify( {[joke.id]: joke} ));

      // act
      let actual = GetSessionFavJokes();

      // assert
      expect(actual).toEqual([joke]);
    })

    it('should return empty array if session storage doesnt contain jokes', () => {
      // arrange
      let GetSessionFavJokes = (): Joke[] => {
        let favJokes = [];
        if (sessionStorage.getItem('favJokes')) {
          let sessionFavJokes = JSON.parse(sessionStorage.getItem('favJokes'));
          favJokes = Object.values(sessionFavJokes);
        }
        return favJokes;
      }
      sessionStorage.clear();

      // act
      let actual = GetSessionFavJokes();

      // assert
      expect(actual).toEqual([]);
    })
  })

  describe('sessionFavJokes setter', () => {
    // due to inability to mock 'sessionStorage' variable in setter,
    // setter's code tested here as function
    beforeEach(() => {
      let storage: Object = {};

      spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string) => {
        storage[key] = value;
      });

      spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
        return storage[key] || "{}";
      });

      spyOn(sessionStorage, 'clear').and.callFake(() => {
        storage = {};
      });

      spyOnProperty(sessionStorage, 'length').and.returnValue(Object.keys(storage) ? 1 : 0);
    })

    it('should create object of joke in session storage if input array contains joke', () => {
      // arrange
      let SetSessionFavJokes = (favJokes: Joke[]) => {
        let updFavJokes = {};
        if (favJokes.length > 0) {
          for (let favJoke of favJokes) {
            updFavJokes[favJoke.id] = favJoke;
          }
        }
        sessionStorage.setItem('favJokes', JSON.stringify(updFavJokes));
      }
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      sessionStorage.clear();

      // act
      SetSessionFavJokes([joke]);
      let actual = JSON.parse(sessionStorage.getItem('favJokes'));

      // assert
      expect(actual).toEqual({[joke.id]: joke});
    })

    it('should create empty object of joke in session storage if input array is empty', () => {
      // arrange
      let SetSessionFavJokes = (favJokes: Joke[]) => {
        let updFavJokes = {};
        if (favJokes.length > 0) {
          for (let favJoke of favJokes) {
            updFavJokes[favJoke.id] = favJoke;
          }
        }
        sessionStorage.setItem('favJokes', JSON.stringify(updFavJokes));
      }
      sessionStorage.clear();

      // act
      SetSessionFavJokes([]);
      let actual = JSON.parse(sessionStorage.getItem('favJokes'));

      // assert
      expect(actual).toEqual({});
    })
  })

  describe('GetJokeByRandom', () => {
    
  })
});


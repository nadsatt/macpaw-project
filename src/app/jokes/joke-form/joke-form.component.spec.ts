import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { JokeFormComponent } from './joke-form.component';
import { JokeService } from 'src/app/_services/joke.service';
import { SearchJokesService } from 'src/app/_services/search-jokes.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppModule } from 'src/app/app.module';
import { Joke } from 'src/app/_models/joke';

class JokeServiceClass {
  GetJokeCategories(): Observable<string[]> {
    return of(['any']);
  }

  GetRandomJoke(): Observable<Joke> {
    return of (new Joke());
  }

  GetRandomJokeByCategory(category: string): Observable<Joke> {
    return of (new Joke());
  }

  GetJokesBySearch(category: string): Observable<Joke[]> {
    return of ([new Joke()]);
  }
}

xdescribe('JokeFormComponent', () => {
  let component: JokeFormComponent;
  let fixture: ComponentFixture<JokeFormComponent>;
  let searchJokesServiceSpy: { 'UpdateJokes': jasmine.Spy };
  let joke;
  let jokes;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    searchJokesServiceSpy = jasmine.createSpyObj('SearchJokesService',
     ['UpdateJokes']);
    TestBed.configureTestingModule({
      declarations: [ JokeFormComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: SearchJokesService, useValue: searchJokesServiceSpy }
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AppModule
      ]}).overrideComponent(JokeFormComponent, {
        set: {
          providers: [
            {provide: JokeService, useClass: JokeServiceClass}
          ]
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeFormComponent);
    component = fixture.componentInstance;
    component.jokeForm = formBuilder.group({
      getJokeBy: null,
      category: null, 
      search: null
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'GetJokeCategories').and.callFake(() => {});
    })
    it('should call "GetJokeCategories" method', () => {
      // act
      component.ngOnInit();
  
      // assert
      expect(component.GetJokeCategories).toHaveBeenCalledTimes(1);
    })

    it('should call FormBuilder "group" method', () => {
      // arrange
      spyOn(formBuilder, 'group').and.callThrough();

      // act
      component.ngOnInit();
  
      // assert
      expect(formBuilder.group).toHaveBeenCalledTimes(1);
    })

    it('should call "group" method of FormBuilder with defined obj', () => {
      // arrange
      let expected = {
        getJokeBy: 'getJokeByRandom',
        category: '',
        search: ['', [jasmine.any(Function), jasmine.any(Function)]]
      };
      spyOn(formBuilder, 'group').and.callThrough();

      // act
      component.ngOnInit();
  
      // assert
      expect(formBuilder.group).toHaveBeenCalledWith(expected);
    })

    it('should init "jokeForm" var with defined obj', () => {
      // arrange
      let expected = formBuilder.group({
        getJokeBy: 'getJokeByRandom',
        category: '',
        search: ['', [Validators.required, Validators.minLength(3)]]
      });

      // act
      component.ngOnInit();

      // assert
      expect(component.jokeForm.toString()).toEqual(expected.toString());
    })
  });

  describe('GetJokeCategories', () => {
    it('should call "GetJokeCategories" method of JokeService', () => {
      // arrange
      spyOn(JokeServiceClass.prototype, 'GetJokeCategories').and.returnValue(of(['category1']));

      // act
      component.GetJokeCategories();

      // assert
      expect(JokeServiceClass.prototype.GetJokeCategories).toHaveBeenCalled();
    })

    it('should assign returned categories to "categories" var', () => {
      // arrange
      let expected = ['category1', 'category2'];
      spyOn(JokeServiceClass.prototype, 'GetJokeCategories').and.returnValue(of(expected));

      // act
      component.GetJokeCategories();

      // assert
      expect(component.categories).toEqual(expected);
    })

    it('should set first value of returned categories as default for "category" field', () => {
      // arrange
      let expected = ['category1', 'category2'];
      spyOn(JokeServiceClass.prototype, 'GetJokeCategories').and.returnValue(of(expected));

      // act
      component.GetJokeCategories();

      // assert
      expect(component.jokeForm.get('category').value).toEqual(expected[0]);
    })
  })

  describe('GetJoke', () => {
    it('should call "GetJokeByRandom" method if "getJokeBy" field equals to self-titled value', () => {
      // arrange
      spyOn(component, 'GetJokeByRandom').and.callFake(() => {});
      component.jokeForm = formBuilder.group({
        getJokeBy: 'getJokeByRandom',
        category: '',
        search: ''
      });

      // act
      component.GetJoke();

      // assert
      expect(component.GetJokeByRandom).toHaveBeenCalled();
    })

    it('should call "GetJokeByCategory" method if "getJokeBy" field equals to self-titled value and "category" field defined', () => {
      // arrange
      let expected = 'any';
      spyOn(component, 'GetJokeByCategory').and.callFake((category) => {});
      component.jokeForm = formBuilder.group({
        getJokeBy: 'getJokeByCategory',
        category: expected,
        search: ''
      });

      // act
      component.GetJoke();

      // assert
      expect(component.GetJokeByCategory).toHaveBeenCalled();
      expect(component.GetJokeByCategory).toHaveBeenCalledWith(expected);
    })

    it('should call "GetJokeBySearch" method if "getJokeBy" field equals to self-titled value and "search" field defined', () => {
      // arrange
      let expected = 'any';
      spyOn(component, 'GetJokesBySearch').and.callFake((category) => {});
      component.jokeForm = formBuilder.group({
        getJokeBy: 'getJokeBySearch',
        category: '',
        search: expected
      });

      // act
      component.GetJoke();

      // assert
      expect(component.GetJokesBySearch).toHaveBeenCalled();
      expect(component.GetJokesBySearch).toHaveBeenCalledWith(expected);
    })
  })

  describe('GetJokeByRandom', () => {
    beforeEach(() => {
      joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      spyOn(JokeServiceClass.prototype, 'GetRandomJoke').and.returnValue(of(joke));
      fixture.detectChanges();
    })

    it('should call "GetRandomJoke" method of JokeService', () => {
      // act
      component.GetJokeByRandom();

      // assert
      expect(JokeServiceClass.prototype.GetRandomJoke).toHaveBeenCalled();
    })

    it('should call "UpdateJokes" method with returned joke after subscription', () => {
      // arrange
      spyOn(component, 'UpdateJokes').and.callFake(() => {});

      // act
      component.GetJokeByRandom();

      // assert
      expect(component.UpdateJokes).toHaveBeenCalled();
      expect(component.UpdateJokes).toHaveBeenCalledWith(joke);
    })
  })

  describe('GetJokeByCategory', () => {
    beforeEach(() => {
      joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      spyOn(JokeServiceClass.prototype, 'GetRandomJokeByCategory').and.returnValue(of(joke));
      fixture.detectChanges();
    })

    it('should call "GetRandomJokeByCategory" method of JokeService with defined category', () => {
      // arrange
      let category = 'any';

      // act
      component.GetJokeByCategory(category);

      // assert
      expect(JokeServiceClass.prototype.GetRandomJokeByCategory).toHaveBeenCalled();
      expect(JokeServiceClass.prototype.GetRandomJokeByCategory).toHaveBeenCalledWith(category);
    })

    it('should call "UpdateJokes" method with returned joke after subscription', () => {
      // arrange
      let category = 'any';
      spyOn(component, 'UpdateJokes').and.callFake(() => {});

      // act
      component.GetJokeByCategory(category);

      // assert
      expect(component.UpdateJokes).toHaveBeenCalled();
      expect(component.UpdateJokes).toHaveBeenCalledWith(joke);
    })
  })

  describe('GetJokesBySearch', () => {
    beforeEach(() => {
      jokes = [
        { categories:[],
          created_at:"2020-01-05 13:42:21.179347",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"JGvnB9CIQd2OdkUtqC0sqg",
          updated_at:"2020-01-05 13:42:21.179347",
          url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
          value:"When Chuck Norris eats pussy its cannibalism" },
        { categories:[],
          created_at:"2020-01-05 13:42:27.496799",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"4Vl6P5quQPe7o6pXiITKag",
          updated_at:"2020-01-05 13:42:27.496799",
          url:"https://api.chucknorris.io/jokes/4Vl6P5quQPe7o6pXiITKag",
          value:"Chuck Norris made the Kessel run in less than three parsecs." }
      ];
      fixture.detectChanges();
    })

    it('should call "GetJokesBySearch" method of JokeService with defined search', () => {
       // arrange
       let search = 'any';
       spyOn(JokeServiceClass.prototype, 'GetJokesBySearch').and.returnValue(of(jokes));

       // act
       component.GetJokesBySearch(search);
 
       // assert
       expect(JokeServiceClass.prototype.GetJokesBySearch).toHaveBeenCalled();
       expect(JokeServiceClass.prototype.GetJokesBySearch).toHaveBeenCalledWith(search);
    })

    it('should call "UpdateJokes" method with returned jokes after subscription', () => {
      // arrange
      let search = 'any';
      spyOn(JokeServiceClass.prototype, 'GetJokesBySearch').and.returnValue(of(jokes));
      spyOn(component, 'UpdateJokes').and.callFake(() => {});

      // act
      component.GetJokesBySearch(search);

      // assert
      expect(component.UpdateJokes).toHaveBeenCalled();
      expect(component.UpdateJokes).toHaveBeenCalledWith(...jokes);
    })

    it('should modify "displayNoJokesAlert" to true if no jokes returned after subscription', () => {
      // arrange
      let search = 'any';
      spyOn(JokeServiceClass.prototype, 'GetJokesBySearch').and.returnValue(of([]));
      spyOn(component, 'UpdateJokes').and.callFake(() => {});

      // act
      component.GetJokesBySearch(search);

      // assert
      expect(component.UpdateJokes).not.toHaveBeenCalled();
      expect(component.displayNoJokesAlert).toEqual(true);
    })
  })

  describe('UpdateJokes', () => {
    it('should call "UpdateJokes" method of SearchJokesService', () => {
      // arrange
      searchJokesServiceSpy.UpdateJokes.and.callFake(() => {});

      // act
      component.UpdateJokes();

      // assert
      expect(searchJokesServiceSpy.UpdateJokes).toHaveBeenCalled();
    })
  })
})

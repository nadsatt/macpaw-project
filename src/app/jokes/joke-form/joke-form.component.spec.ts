import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { JokeFormComponent } from './joke-form.component';
import { JokeService } from 'src/app/_services/joke.service';

xdescribe('JokeFormComponent', () => {
  let component: JokeFormComponent;
  let fixture: ComponentFixture<JokeFormComponent>;
  let jokeServiceSpy: { 
    'GetJokeCategories', 
    'GetRandomJoke',
    'GetRandomJokeByCategory',
    'GetJokesBySearch': jasmine.Spy 
  };
  let getJokeByValSpy: jasmine.Spy;
  // getterSpy.and.returnValue([]);
  let categoryValSpy: jasmine.Spy;
  let submitDisabledSpy: jasmine.Spy;

  beforeEach(async(() => {
    jokeServiceSpy = jasmine.createSpyObj('JokeService', [
      'GetJokeCategories', 
      'GetRandomJoke',
      'GetRandomJokeByCategory',
      'GetJokesBySearch'
    ]);
    TestBed.configureTestingModule({
      declarations: [ JokeFormComponent ],
      providers: [
        { provide: JokeService, useValue: jokeServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    getJokeByValSpy = spyOnProperty(component, 'getJokeByVal', 'get');
    categoryValSpy = spyOnProperty(component, 'categoryVal', 'get');
    submitDisabledSpy = spyOnProperty(component, 'submitDisabled', 'get');
    fixture = TestBed.createComponent(JokeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('ngOnInit', () => {
    it('should initialize categories var as array', () => {
      // act
      component.ngOnInit();
  
      // assert
      expect(component.categories).toBeInstanceOf(Array);
    })

    it('should call GetJokeCategories method', () => {
      // act
      component.ngOnInit();
  
      // assert
      expect(component.GetJokeCategories).toHaveBeenCalledTimes(1);
    })
  });

  xdescribe('GetJokeByRandom', () => {
    beforeEach(() => {
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      jokeServiceSpy.GetRandomJoke.and.returnValue(new Observable((observer) => {
        observer.next(joke);
      }));
      fixture.detectChanges();
    })

    it('should add joke to "jokes" array', () => {
      // act
      component.GetJokeByRandom();

      // assert
      expect(jokeServiceSpy.GetRandomJoke).toHaveBeenCalled();
      //expect(component.jokes).toContain(joke);
      //expect(component.jokes.length).toEqual(1);
    })

    it('should add joke at the beginning of "jokes" array', () => {
      // arrange
      /*component.jokes = [{ categories:[],
          created_at:"2020-01-05 13:42:24.142371",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"6_MNkQ-JTKq3tS-Gx4H6Cg",
          updated_at:"2020-01-05 13:42:24.142371",
          url:"https://api.chucknorris.io/jokes/6_MNkQ-JTKq3tS-Gx4H6Cg",
          value:"Chuck Norris went back in time and punched Moses in the face, just to prove that he could do it."
      }];
*/
      // act
      component.GetJokeByRandom();

      // assert
      //expect(component.jokes.length).toEqual(2);
      //expect(component.jokes[0].id).toEqual(joke.id);
    })
  })

  xdescribe('GetJokeByCategory', () => {
    beforeEach(() => {
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"JGvnB9CIQd2OdkUtqC0sqg",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/JGvnB9CIQd2OdkUtqC0sqg",
        value:"When Chuck Norris eats pussy its cannibalism"
      };
      jokeServiceSpy.GetRandomJokeByCategory.and.returnValue(new Observable((observer) => {
        observer.next(joke);
      }));
      fixture.detectChanges();
    })

    it('should add joke to "jokes" array', () => {
      component.GetJokeByCategory("any");

      // assert
      expect(jokeServiceSpy.GetRandomJokeByCategory).toHaveBeenCalled();
      //expect(component.jokes).toContain(joke);
      //expect(component.jokes.length).toEqual(1);
    })

    it('should add joke at the beginning of "jokes" array', () => {
      // arrange
      /*component.jokes = [
        { categories:[],
          created_at:"2020-01-05 13:42:24.142371",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"6_MNkQ-JTKq3tS-Gx4H6Cg",
          updated_at:"2020-01-05 13:42:24.142371",
          url:"https://api.chucknorris.io/jokes/6_MNkQ-JTKq3tS-Gx4H6Cg",
          value:"Chuck Norris went back in time and punched Moses in the face, just to prove that he could do it." }
      ];
  */
      // act
      component.GetJokeByCategory("any");
  
      // assert
      //expect(component.jokes.length).toEqual(2);
      //expect(component.jokes[0].id).toEqual(joke.id);
    })
  })

  describe('GetJokesBySearch', () => {
    beforeEach(() => {
      let jokes = [
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
      jokeServiceSpy.GetJokesBySearch.and.returnValue(new Observable((observer) => {
        observer.next(jokes);
      }));
      fixture.detectChanges();
    })

    it('should add jokes to "jokes" array', () => {
      // act
      component.GetJokesBySearch('any');

      // assert
      expect(jokeServiceSpy.GetJokesBySearch).toHaveBeenCalled();
      //expect(component.jokes.length).toEqual(2);
      //expect(component.jokes).toContain(jokes[0]);
      //expect(component.jokes).toContain(jokes[1]);
    })

    it('should add jokes to the beginning of "jokes" array', () => {
      // assert
      let jokeId = "6_MNkQ-JTKq3tS-Gx4H6Cg";
      /*component.jokes = [
        { categories:[],
          created_at:"2020-01-05 13:42:24.142371",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:jokeId,
          updated_at:"2020-01-05 13:42:24.142371",
          url:"https://api.chucknorris.io/jokes/6_MNkQ-JTKq3tS-Gx4H6Cg",
          value:"Chuck Norris went back in time and punched Moses in the face, just to prove that he could do it." }
      ];
    */
      // act
      component.GetJokesBySearch('any');

      // assert
      //expect(component.jokes.length).toEqual(3);
      //expect(component.jokes[2].id).toEqual(jokeId);
    })
  })
})

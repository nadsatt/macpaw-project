import { TestBed } from '@angular/core/testing';
import { SearchJokesService } from './search-jokes.service';
import { Joke } from '../_models/joke';

describe('SearchJokesService', () => {
  let searchJokesService: SearchJokesService;
  let pushUpdJokesSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    searchJokesService = TestBed.inject(SearchJokesService);
    pushUpdJokesSpy = spyOn<any>(searchJokesService, 'PushUpdatedJokes'); 
  });

  it('should be created', () => {
    expect(searchJokesService).toBeTruthy();
  });

  describe('UpdateJokes', () => {
    it('should execute "PushUpdatedJokes" method', () => {
      // arrange
      pushUpdJokesSpy.and.callThrough();
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      }

      // act
      searchJokesService.UpdateJokes(joke);

      // assert
      expect(pushUpdJokesSpy).toHaveBeenCalled();
  })

    it('should execute "PushUpdatedJokes" method with updated local "jokes" var', () => {
      // arrange
      let jokes: Joke[] = [];
      (searchJokesService as any).jokesSource = {value: jokes};
      pushUpdJokesSpy.and.callFake((updJokes) => jokes = updJokes);
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      }

      // act
      searchJokesService.UpdateJokes(joke);

      // assert
      expect(pushUpdJokesSpy).toHaveBeenCalledWith(jokes);
      expect(jokes.length).toEqual(1);
    })

    it('should add joke to local "jokes" var if it is called with one joke AND "jokes" var does not contain this joke', () => {
        // arrange
        let jokes: Joke[] = [];
        (searchJokesService as any).jokesSource = {value: jokes};
        pushUpdJokesSpy.and.callFake((updJokes) => jokes = updJokes);
        let joke = {
          categories:[],
          created_at:"2020-01-05 13:42:25.628594",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"r6ygrKaoQV-wQNeAd9cCPw",
          updated_at:"2020-01-05 13:42:25.628594",
          url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
          value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
        }

      // act
      searchJokesService.UpdateJokes(joke);

      // assert
      expect(jokes.length).toEqual(1);
      expect(jokes).toContain(joke);
    })

    it('should not add joke to local "jokes" var if it is called with one joke AND "jokes" var already contains this joke', () => {
      // arrange
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      }
      let jokes: Joke[] = [joke];
      (searchJokesService as any).jokesSource = {value: jokes};
      pushUpdJokesSpy.and.callFake((updJokes) => jokes = updJokes);
  
     // act
     searchJokesService.UpdateJokes(joke);

     // assert
     expect(jokes.length).toEqual(1);
   })

    it('should add multiple jokes to local "jokes" var if it is called with multiple jokes', () => {
      // arrange
      let jokes: Joke[] = [];
      (searchJokesService as any).jokesSource = {value: jokes};
      pushUpdJokesSpy.and.callFake((updJokes) => jokes = updJokes);
      let joke1 = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      }
      let joke2 = { 
        categories:[],
        created_at:"2020-01-05 13:42:20.262289",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"IUX67cIdQjG1pzEqsZPGhw",
        updated_at:"2020-01-05 13:42:20.262289",
        url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
        value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
      }

      // act
      searchJokesService.UpdateJokes(joke1, joke2);

      // assert
      expect(jokes.length).toEqual(2);
      expect(jokes).toContain(joke1, joke2);
    })

    it('should add joke at the beginning of local "jokes" var if it is called with one joke AND "jokes" var does not contain this joke', () => {
      // arrange
      let jokes: Joke[] = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        }
      ];
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };
      (searchJokesService as any).jokesSource = {value: jokes};
      pushUpdJokesSpy.and.callFake((updJokes) => jokes = updJokes);

      // act
      searchJokesService.UpdateJokes(joke);

      // assert
      expect(jokes[0]).toEqual(joke);
    })

    it('should add jokes at the beginning of local "jokes" var if it is called with multiple jokes', () => {
      // arrange
      let jokes: Joke[] = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        }
      ];
      let joke1 = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };
      let joke2 = {
        categories:[],
        created_at:"2020-01-05 13:42:21.179347",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"CJ_39dM9TLyu-sbbbn0zIA",
        updated_at:"2020-01-05 13:42:21.179347",
        url:"https://api.chucknorris.io/jokes/CJ_39dM9TLyu-sbbbn0zIA",
        value:"Chuck Norris usually finishes typing before the words start getting displayed on the screen"
      };
      (searchJokesService as any).jokesSource = {value: jokes};
      pushUpdJokesSpy.and.callFake((updJokes) => jokes = updJokes);

      // act
      searchJokesService.UpdateJokes(joke1, joke2);

      // assert
      expect(jokes[0]).toEqual(joke1);
      expect(jokes[1]).toEqual(joke2);
    })
  })
});

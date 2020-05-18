import { JokeService } from './joke.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { cold } from 'jasmine-marbles';

describe('JokeService', () => {

  let jokeService: JokeService;
  let httpClientSpy: { 'get': jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    jokeService = new JokeService(<any> httpClientSpy);
  })

  describe('GetJokeCategories', () => {
    it('should be called once with defined api', () => {
      // arrange
      httpClientSpy.get.and.returnValue(of(true));
      let api: string = 'https://api.chucknorris.io/jokes/categories';

      // act 
      jokeService.GetJokeCategories();

      // assert
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(api);
    })

    it('should return observable which returns string array', () => {
      // arrange 
      let expected = [
        "animal","career","celebrity","dev","explicit",
        "fashion","food","history","money","movie","music",
        "political","religion","science","sport","travel"
      ];
      httpClientSpy.get.and.returnValue(of(expected));

      // act && assert
      jokeService.GetJokeCategories().subscribe({
        next: actual => {
          expect(actual).toBeInstanceOf(Array);
          expect(typeof actual[0]).toBeInstanceOf(String);
        }
      });
    })
  })

  describe('GetRandomJoke', () => {
    it ('should be called once with defined api', () => {
      // arrange
      httpClientSpy.get.and.returnValue(of(true));
      let api: string = 'https://api.chucknorris.io/jokes/random';

      // act
      jokeService.GetRandomJoke();

      // assert
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(api);
    })

    it ('should return observable which returns joke', () => {
      // arrange 
      let expected = {
        categories:[],
        created_at:"2020-01-05 13:42:19.324003",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"qd6wpqqyrhilhm1qnq24vq",
        updated_at:"2020-01-05 13:42:19.324003",
        url:"https://api.chucknorris.io/jokes/qd6wpqqyrhilhm1qnq24vq",
        value:"There is no theory of evolution, just a list of creatures Chuck Norris allows to live."
      };
      httpClientSpy.get.and.returnValue(of(expected));

      // act && assert
      jokeService.GetRandomJoke().subscribe({
        next: actual => expect(actual).toEqual(expected)
      });
    })
  })

  describe('GetRandomJokeByCategory', () => {
    it ('should be called once with defined api', () => {
      // arrange
      httpClientSpy.get.and.returnValue(of(true));
      let api = 'https://api.chucknorris.io/jokes/random?category=';
      let category = "any";

      // act
      jokeService.GetRandomJokeByCategory(category);

      // assert
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(api + category);
    })

    it ('should return observable which returns modified joke', () => {
      // arrange
      let category = "any";
      let joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"XqF6RY0lQDK96FUZj5XdXA","updated_at":"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/XqF6RY0lQDK96FUZj5XdXA",
        value:"Chuck Norris can eat the flesh of banana without peeling it."
      };
      let expected = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"XqF6RY0lQDK96FUZj5XdXA","updated_at":"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/XqF6RY0lQDK96FUZj5XdXA",
        value:"Chuck Norris can eat the flesh of banana without peeling it.",
        fetchedByCategory: category
      };
      httpClientSpy.get.and.returnValue(of(joke));

      // act && assert
      jokeService.GetRandomJokeByCategory(category).subscribe({ 
        next: actual => expect(actual).toEqual(expected)
      }); 
    }) 
  })

  describe('GetJokesBySearch', () => {
    it ('should be called once with defined api', () => {
      // arrange
      httpClientSpy.get.and.returnValue(of(true));
      let api = 'https://api.chucknorris.io/jokes/search?query=';
      let text = "text";

      // act
      jokeService.GetJokesBySearch(text);

      // assert
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(api + text);
    })

    it('should return observable which returns jokes', () => {
      // arrange
      let expected = [
        { categories:[],created_at:"2020-01-05 13:42:26.991637",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"0cyirBrJSay5yYEL1yYw_A", 
          updated_at:"2020-01-05 13:42:26.991637",
          url:"https://api.chucknorris.io/jokes/0cyirBrJSay5yYEL1yYw_A",
          value:"In the original making of Scarface when Tony said \"say hello to my little friend\" Chuck Norris appeared. However, the director cut it out said it was too gruesome for a R rated movie."
        },
        { categories:[],created_at:"2020-01-05 13:42:30.480041",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"g96iRXO6TPWAgWkrWf_YRQ",
          updated_at:"2020-01-05 13:42:30.480041",
          url:"https://api.chucknorris.io/jokes/g96iRXO6TPWAgWkrWf_YRQ",
          value:"once upon a time Chuck Norris seen a mime\"hello\" said chuck the mime didnt answer so he round house kicked him to death."
        }
      ];
      httpClientSpy.get.and.returnValue(of({result: expected}));

      // act && assert
      jokeService.GetJokesBySearch('text').subscribe({
        next: actual => expect(actual).toEqual(expected)
      })
    })
  })

  describe('HandleError', () => {
    it('should throw error with defined message if error is client-side', () => {
        // arrange
        let err = new Error('client-side error occured');
        let expected$ = cold('#', undefined, 'Error: client-side error occured');
  
        // act
        let actual$ = jokeService.HandleError(err);
  
        // assert
        expect(actual$).toBeObservable(expected$);
    })

    it('should throw error with defined message if error is server-side', () => {
          // arrange
          let err = new HttpErrorResponse({status: 401, url: 'https://any'});
          let expected$ = cold('#', undefined, 
          'Error Code: 401\nMessage: Http failure response for https://any: 401 undefined');
    
          // act
          let actual$ = jokeService.HandleError(err);
    
          // assert
          expect(actual$).toBeObservable(expected$);
    })
  })
});


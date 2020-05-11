import { JokeService } from './joke.service';
import { of, Observable, throwError } from 'rxjs';

describe('JokeService', () => {
  // global arrange 
  let jokeService: JokeService;
  let httpClientSpy: { 'get': jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    jokeService = new JokeService(<any> httpClientSpy);
  })

  describe('GetJokeCategories', () => {
    beforeEach(() => {
      httpClientSpy.get.and.returnValue(of(true));
    })

    it ('should return observable', () => {
      // act
      let actual = jokeService.GetJokeCategories();

      // assert
      expect(actual).toBeInstanceOf(Observable);
    })

    it ('should be called once with defined api', () => {
      // arrange
      const api: string = 'https://api.chucknorris.io/jokes/categories';

      // act
      jokeService.GetJokeCategories();

      // assert
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(api);
    })
  })

  describe('GetRandomJoke', () => {
    beforeEach(() => {
      httpClientSpy.get.and.returnValue(of(true));
    })

    it ('should return observable', () => {
      // act
      let actual = jokeService.GetRandomJoke();

      // assert
      expect(actual).toBeInstanceOf(Observable);
    })

    it ('should be called once with defined api', () => {
      // arrange
      const api: string = 'https://api.chucknorris.io/jokes/random';

      // act
      jokeService.GetRandomJoke();

      // assert
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(api);
    })
  })

  describe('GetRandomJokeByCategory', () => {
    it ('should return observable', () => {
      // arrange
      httpClientSpy.get.and.returnValue(of(true));

      // act
      let actual = jokeService.GetRandomJokeByCategory("any");

      // assert
      expect(actual).toBeInstanceOf(Observable);
    })

    it ('should be called once with defined api + category', () => {
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

    it ('should return modified joke after subscribing to it', () => {
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
      httpClientSpy.get.and.returnValue(of(joke));
      let expected = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"XqF6RY0lQDK96FUZj5XdXA","updated_at":"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/XqF6RY0lQDK96FUZj5XdXA",
        value:"Chuck Norris can eat the flesh of banana without peeling it.",
        fetchedByCategory: category
      };
      let actual;

      // act
      jokeService.GetRandomJokeByCategory(category).subscribe({ 
        next: data => actual = data
      });

      // assert
      expect(actual).toEqual(expected);
    }) 
  })

  describe('GetJokesBySearch', () => {
    it ('should return observable', () => {
      // arrange
      httpClientSpy.get.and.returnValue(of(true));

      // act
      let actual = jokeService.GetJokesBySearch("text");

      // assert
      expect(actual).toBeInstanceOf(Observable);
    })

    it ('should be called once with defined api + text', () => {
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

    it ('should return empty array after subscribing to it if 4** error occurs', () => {
      // arrange
      httpClientSpy.get.and.returnValue(throwError({status: 400}));
      let actual;

      // act
      jokeService.GetJokesBySearch("text").subscribe({
        next: data => actual = data
      });

      // assert
      expect(actual).toEqual(new Array());
    })

    it ('should return error after subscribing to it if non 4** error occurs', () => {
      // arrange
      let expected = {status: 500};
      httpClientSpy.get.and.returnValue(throwError(expected));
      let actual;
  
      // act
      jokeService.GetJokesBySearch("text").subscribe({
        error: err => actual = err 
      })
  
      // assert
      expect(actual).toEqual(expected);
    })
  })
});

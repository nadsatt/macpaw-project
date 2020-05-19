import { TestBed } from '@angular/core/testing';
import { SearchJokesService } from './search-jokes.service';
import { Joke } from '../_models/joke';
import { BehaviorSubject } from 'rxjs';

describe('SearchJokesService', () => {
  let searchJokesService: SearchJokesService;
  let pushUpdSearchJokesSpy: jasmine.Spy;
  let joke1: Joke;
  let joke2: Joke;
  let joke3: Joke;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    searchJokesService = TestBed.inject(SearchJokesService);
    pushUpdSearchJokesSpy = spyOn<any>(searchJokesService, 'PushUpdatedSearchJokes'); 
  });

  it('should be created', () => {
    expect(searchJokesService).toBeTruthy();
  });

  describe('JokeInSearchJokes', () => {
    beforeEach(() => {
      joke1 = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };
      joke2 = { 
        categories:[],
        created_at:"2020-01-05 13:42:20.262289",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"IUX67cIdQjG1pzEqsZPGhw",
        updated_at:"2020-01-05 13:42:20.262289",
        url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
        value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
      };
    })

    it('should return false if joke not in search jokes', () => {
      // arrange
      searchJokesService.searchJokesSource = new BehaviorSubject([joke2]);

      // act
      let expected = searchJokesService.JokeInSearchJokes(joke1);

      // assert
      expect(expected).toEqual(false);
    })

    it('should return false if search jokes empty', () => {
      // arrange
      searchJokesService.searchJokesSource = new BehaviorSubject([]);

      // act
      let expected = searchJokesService.JokeInSearchJokes(joke1);

      // assert
      expect(expected).toEqual(false);
    })

    it('should return true if joke in search jokes', () => {
      // arrange
      searchJokesService.searchJokesSource = new BehaviorSubject([joke1]);

      // act
      let expected = searchJokesService.JokeInSearchJokes(joke1);

      // assert
      expect(expected).toEqual(true);
    })
  })

  describe('UpdateSearchJokesAfterFetchingJokes', () => {
    beforeEach(() => {
      joke1 = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };
      joke2 = { 
        categories:[],
        created_at:"2020-01-05 13:42:20.262289",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"IUX67cIdQjG1pzEqsZPGhw",
        updated_at:"2020-01-05 13:42:20.262289",
        url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
        value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
      };
      joke3 = {
        categories:[],
        created_at:"2020-01-05 13:42:29.569033",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"eaNzGEnER8-kZlxD0PbplQ",
        updated_at:"2020-01-05 13:42:29.569033",
        url:"https://api.chucknorris.io/jokes/eaNzGEnER8-kZlxD0PbplQ",
        value:"Chuck Norris does not mow his grass.... he dares it to grow..."
      };
    })

    it('should call "PushUpdatedSearchJokes" method', () => {
        // arrange
        searchJokesService.searchJokesSource = new BehaviorSubject([]);
        spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(false);
        pushUpdSearchJokesSpy.and.callFake(() => {});

        // act
        searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1);

        // assert
        expect(pushUpdSearchJokesSpy).toHaveBeenCalled();
    })

    it('should add one joke to "searchJokes" var', () => {
      // arrange
      let jokes: Joke[] = [];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(false);
      pushUpdSearchJokesSpy.and.callFake((updJokes) => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1);

      // assert
      expect(pushUpdSearchJokesSpy).toHaveBeenCalledWith(jokes);
      expect(jokes.length).toEqual(1);
    })

    it('should add multiple jokes to "searchJokes" var', () => {
      // arrange
      let jokes: Joke[] = [];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(false);
      pushUpdSearchJokesSpy.and.callFake((updJokes) => jokes = updJokes);
  
      // act
      searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1, joke2);
  
      // assert
      expect(pushUpdSearchJokesSpy).toHaveBeenCalledWith(jokes);
      expect(jokes.length).toEqual(2);
    })

    it('should add jokes at the beginning of local "searchJokes" var if it is called with multiple jokes', () => {
      // arrange
      let jokes: Joke[] = [joke3];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(false);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1, joke2);

      // assert
      expect(jokes.length).toEqual(3);
      expect(jokes[2]).toEqual(joke3);
    })

    it('should add joke at the beginning of local "searchJokes" var if it is called with one joke', () => {
      // arrange
      let jokes: Joke[] = [joke3];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(false);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1);

      // assert
      expect(jokes.length).toEqual(2);
      expect(jokes[0]).toEqual(joke1);
    })

    it('should add to local "searchJokes" var joke with "isFavourite"=false if joke not in fav jokes', () => {
      // arrange
      let jokes: Joke[] = [];
      (searchJokesService as any).jokesSource = {value: jokes};
      spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(false);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1);

      // assert
      expect(jokes[0].isFavourite).toEqual(false);
    })

    it('should add to local "searchJokes" var joke with "isFavourite"=true if joke in fav jokes', () => {
      // arrange
      let jokes: Joke[] = [];
      (searchJokesService as any).jokesSource = {value: jokes};
      spyOn(searchJokesService, 'JokeInFavJokes').and.returnValue(true);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFetchingJokes(joke1);

      // assert
      expect(jokes[0].isFavourite).toEqual(true);
    })
  })

  describe('UpdateSearchJokesAfterFavouritingJoke', () => {
    beforeEach(() => {
      joke1 = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored.",
        isFavourite: false
      };
      joke2 = { 
        categories:[],
        created_at:"2020-01-05 13:42:20.262289",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"IUX67cIdQjG1pzEqsZPGhw",
        updated_at:"2020-01-05 13:42:20.262289",
        url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
        value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life.",
        isFavourite: false
      };
    })

    it('should call "PushUpdatedSearchJokes" method', () => {
        // arrange
        searchJokesService.searchJokesSource = new BehaviorSubject([joke1, joke1]);
        pushUpdSearchJokesSpy.and.callFake(() => {});

        // act
        searchJokesService.UpdateSearchJokesAfterFavouritingJoke(joke1);

        // assert
        expect(pushUpdSearchJokesSpy).toHaveBeenCalled();
    })

    it('should call "PushUpdatedSearchJokes" method with updated local "searchJokes" var', () => {
      // arrange
      let jokes: Joke[] = [joke1, joke1];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFavouritingJoke(joke1);

      // assert
      expect(pushUpdSearchJokesSpy).toHaveBeenCalledWith(jokes);
      expect(jokes.length).toEqual(2);
      expect(jokes[0].isFavourite).toEqual(true);
      expect(jokes[1].isFavourite).toEqual(true);
    })

    it('should mark as favourited dublicates of favourited joke in local "searchJokes" var', () => {
      // arrange
      let jokes: Joke[] = [joke1, joke1];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFavouritingJoke(joke1);

      // assert
      expect(jokes[0].isFavourite).toEqual(true);
      expect(jokes[1].isFavourite).toEqual(true);
    })

    it('should not mark as favourited non dublicates of favourited joke in local "searchJokes" var', () => {
      // arrange
      let jokes: Joke[] = [joke1, joke1, joke2];
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterFavouritingJoke(joke1);

      // assert
      expect(jokes[2].isFavourite).toEqual(false);
    })
  })

  describe('UpdateSearchJokesAfterUnfavouritingJoke', () => {
    beforeEach(() => {
      joke1 = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };
      joke2 = { 
        categories:[],
        created_at:"2020-01-05 13:42:20.262289",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"IUX67cIdQjG1pzEqsZPGhw",
        updated_at:"2020-01-05 13:42:20.262289",
        url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
        value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
      };
    })

    it('should call "PushUpdatedSearchJokes" method', () => {
        // arrange
        searchJokesService.searchJokesSource = new BehaviorSubject([]);
        pushUpdSearchJokesSpy.and.callFake(() => {});

        // act
        searchJokesService.UpdateSearchJokesAfterFavouritingJoke(joke1);

        // assert
        expect(pushUpdSearchJokesSpy).toHaveBeenCalled();
    })

    it('should call "PushUpdatedSearchJokes" method with updated local "searchJokes" var', () => {
      // arrange
      joke1.isFavourite = false;
      joke2.isFavourite = true;
      let jokes: Joke[] = [joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(false);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke2);

      // assert
      expect(pushUpdSearchJokesSpy).toHaveBeenCalledWith(jokes);
      expect(jokes.length).toEqual(2);
    })

    it('should add unfavourited joke to local "searchJokes" var if search jokes does not contain dublicates of unfavourited joke', () => {
      // arrange
      joke1.isFavourite = false;
      joke2.isFavourite = true;
      let jokes: Joke[] = [joke1, joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(false);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke2);

      // assert
      expect(jokes.length).toEqual(3);
      expect(jokes).toContain(joke2);
    })

    it('should add unfavourited joke at the beginning of local "searchJokes" var if search jokes does not contain dublicates of unfavourited joke', () => {
      // arrange
      joke1.isFavourite = false;
      joke2.isFavourite = true;
      let jokes: Joke[] = [joke1, joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(false);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke2);

      // assert
      expect(jokes.length).toEqual(3);
      expect(jokes[0]).toEqual(joke2);
    })

    it('should mark as unfavourited joke being added to local "searchJokes" var if search jokes does not contain dublicates of unfavourited joke', () => {
      // arrange
      joke1.isFavourite = true;
      joke2.isFavourite = true;
      let jokes: Joke[] = [joke1, joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(false);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke2);

      // assert
      expect(jokes.length).toEqual(3);
      expect(jokes[0].isFavourite).toEqual(false);
      expect(jokes[1].isFavourite).toEqual(true);
      expect(jokes[2].isFavourite).toEqual(true);
    })

    it('should not add unfavourited joke to local "searchJokes" var if search jokes contains dublicates of unfavourited joke', () => {
      // arrange
      joke1.isFavourite = true;
      let jokes: Joke[] = [joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(true);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke1);

      // assert
      expect(jokes.length).toEqual(1);
    })

    it('should mark as unfavourited dublicates of unfavourited joke in local "searchJokes" var', () => {
      // arrange
      joke1.isFavourite = true;
      let jokes: Joke[] = [joke1, joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(true);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke1);

      // assert
      expect(jokes.length).toEqual(2);
      expect(jokes[0].isFavourite).toEqual(false);
      expect(jokes[1].isFavourite).toEqual(false);
    })

    it('should not mark as unfavourited non dublicates of unfavourited joke in local "searchJokes" var', () => {
      // arrange
      joke1.isFavourite = true;
      let jokes: Joke[] = [joke1, joke1];
      spyOn(searchJokesService, 'JokeInSearchJokes').and.returnValue(false);
      searchJokesService.searchJokesSource = new BehaviorSubject(jokes);
      pushUpdSearchJokesSpy.and.callFake(updJokes => jokes = updJokes);

      // act
      searchJokesService.UpdateSearchJokesAfterUnfavouritingJoke(joke2);

      // assert
      expect(jokes.length).toEqual(3);
      expect(jokes[0]).toEqual(joke2);
      expect(jokes[1].isFavourite).toEqual(true);
      expect(jokes[2].isFavourite).toEqual(true);
    })
  })
});


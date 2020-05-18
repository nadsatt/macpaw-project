import { TestBed } from '@angular/core/testing';
import { FavJokesService } from './fav-jokes.service';
import { Joke } from '../_models/joke';

describe('FavJokesService', () => {
  let favJokesService: FavJokesService;
  let getFavJokesSpy: jasmine.Spy;
  let setFavJokesSpy: jasmine.Spy;
  let pushUpdFavJokesSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    favJokesService = TestBed.inject(FavJokesService);
    getFavJokesSpy = spyOn<any>(favJokesService, 'GetFavJokes');
    setFavJokesSpy = spyOn<any>(favJokesService, 'SetFavJokes')
    pushUpdFavJokesSpy = spyOn<any>(favJokesService, 'PushUpdatedFavJokes')
  });

  it('should be created', () => {
    expect(favJokesService).toBeTruthy();
  });

  describe('ShowFavJokes', () => {
    it('should change "showFavJokes" var to true', () => {
      // act
      favJokesService.ShowFavJokes()

       // assert
      expect(favJokesService.showFavJokes).toEqual(true);
    })
  })

  describe('HideFavJokes', () => {
    it('should change "showFavJokes" var to false', () => {
      // act
      favJokesService.HideFavJokes();

       // assert
      expect(favJokesService.showFavJokes).toEqual(false);
    })
  })

  describe('AddFavJoke', () => {
    it('should call "GetFavJokes" method once', () => {
      // arrange
      setFavJokesSpy.and.callThrough();
      pushUpdFavJokesSpy.and.callThrough();
      getFavJokesSpy.and.callThrough();

      // act
      favJokesService.AddFavJoke(new Joke());

      // assert
      expect(getFavJokesSpy).toHaveBeenCalledTimes(1);
    })

    it('should call "SetFavJokes" method once', () => {
      // arrange
      getFavJokesSpy.and.callThrough();
      setFavJokesSpy.and.callThrough();
      getFavJokesSpy.and.callThrough();
        
      // act
      favJokesService.AddFavJoke(new Joke());

      // assert
      expect(setFavJokesSpy).toHaveBeenCalledTimes(1);
    })

    it('should call "SetFavJokes" method width updated fav jokes', () => {
      // arrange
      let favJokes: Joke[] = [];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake((updFavJokes) => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
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
      favJokesService.AddFavJoke(joke);

      // assert
      expect(setFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
    })

    it('should call "PushUpdatedFavJokes" method once', () => {
      // arrange
      getFavJokesSpy.and.callThrough();
      setFavJokesSpy.and.callThrough();
      getFavJokesSpy.and.callThrough();
      
      // act
      favJokesService.AddFavJoke(new Joke());

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalledTimes(1);
    })

    it('should call "PushUpdFavJokes" method width updated fav jokes', () => {
      // arrange
      let favJokes: Joke[] = [];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake((updFavJokes) => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
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
      favJokesService.AddFavJoke(joke);

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
    })

    it('should add joke to local "favJokes" var', () => {
      // arrange
      let favJokes: Joke[] = [];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake((updFavJokes) => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
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
      favJokesService.AddFavJoke(joke);

      // assert
      expect(favJokes.length).toEqual(1);
      expect(favJokes).toContain(joke);
    })
  })

  describe('RemoveFavJoke', () => {
    it('should call "GetFavJokes" method once', () => {
      // arrange
      setFavJokesSpy.and.callThrough();
      pushUpdFavJokesSpy.and.callThrough();
      getFavJokesSpy.and.callThrough();

      // act
      favJokesService.RemoveFavJoke(new Joke());

      // assert
      expect(getFavJokesSpy).toHaveBeenCalledTimes(1);
    })

    it('should call "SetFavJokes" method once', () => {
      // arrange
      getFavJokesSpy.and.callThrough();
      setFavJokesSpy.and.callThrough();
      getFavJokesSpy.and.callThrough();
        
      // act
      favJokesService.RemoveFavJoke(new Joke());

      // assert
      expect(setFavJokesSpy).toHaveBeenCalledTimes(1);
    })

    it('should call "SetFavJokes" method width updated fav jokes', () => {
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
      let favJokes: Joke[] = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        },
        joke
      ];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake((updFavJokes) => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
      
      // act
      favJokesService.RemoveFavJoke(joke);

      // assert
      expect(setFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
    })

    it('should call "PushUpdatedFavJokes" method once', () => {
      // arrange
      getFavJokesSpy.and.callThrough();
      setFavJokesSpy.and.callThrough();
      getFavJokesSpy.and.callThrough();
      
      // act
      favJokesService.RemoveFavJoke(new Joke());

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalledTimes(1);
    })

    it('should call "PushUpdFavJokes" method width updated fav jokes', () => {
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
      let favJokes: Joke[] = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        },
        joke
      ];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake((updFavJokes) => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
      
      // act
      favJokesService.RemoveFavJoke(joke);

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
    })

    it('should remove joke from local "favJokes" var', () => {
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
      let favJokes: Joke[] = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        },
        joke
      ];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake((updFavJokes) => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
      
      // act
      favJokesService.RemoveFavJoke(joke);

      // assert
      expect(favJokes.length).toEqual(1);
      expect(favJokes).not.toContain(joke);
    })
  })
});

import { TestBed } from '@angular/core/testing';
import { FavJokesService } from './fav-jokes.service';
import { Joke } from '../_models/joke';

describe('FavJokesService', () => {
  let favJokesService: FavJokesService;
  let getFavJokesSpy: jasmine.Spy;
  let setFavJokesSpy: jasmine.Spy;
  let pushUpdFavJokesSpy: jasmine.Spy;
  let joke: Joke;
  let favJokes: Joke[];

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

  describe('UpdateFavJokesAfterFavouritingJoke', () => {
    beforeEach(() => {
      joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };
    })

    it('should change value of "isFavourited" joke property to true', () => {
      // arrange
      setFavJokesSpy.and.callFake(() => {});
      getFavJokesSpy.and.returnValue([]);
      pushUpdFavJokesSpy.and.callFake(() => {});
      joke.isFavourite = false;

      // act
      favJokesService.UpdateFavJokesAfterFavouritingJoke(joke);

      // assert
      expect(joke.isFavourite).toEqual(true);
    })

    it('should call "GetFavJokes" method', () => {
      // arrange
      setFavJokesSpy.and.callFake(() => {});
      getFavJokesSpy.and.returnValue([]);
      pushUpdFavJokesSpy.and.callFake(() => {});

      // act
      favJokesService.UpdateFavJokesAfterFavouritingJoke(new Joke());

      // assert
      expect(getFavJokesSpy).toHaveBeenCalled();
    })

    it('should call "SetFavJokes" method', () => {
      // arrange
      setFavJokesSpy.and.callFake(() => {});
      getFavJokesSpy.and.returnValue([]);
      pushUpdFavJokesSpy.and.callFake(() => {});
        
      // act
      favJokesService.UpdateFavJokesAfterFavouritingJoke(new Joke());

      // assert
      expect(setFavJokesSpy).toHaveBeenCalled();
    })

    it('should call "SetFavJokes" method width updated fav jokes array', () => {
      // arrange
      let favJokes: Joke[] = [];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake(updFavJokes => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callFake(() => {});
     
      // act
      favJokesService.UpdateFavJokesAfterFavouritingJoke(joke);

      // assert
      expect(setFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
      expect(favJokes).toContain(joke);
    })

    it('should call "PushUpdatedFavJokes" method', () => {
      // arrange
      setFavJokesSpy.and.callFake(() => {});
      getFavJokesSpy.and.returnValue([]);
      pushUpdFavJokesSpy.and.callFake(() => {});
      
      // act
      favJokesService.UpdateFavJokesAfterFavouritingJoke(new Joke());

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalled();
    })

    it('should call "PushUpdatedFavJokes" method width updated fav jokes', () => {
      // arrange
      let favJokes: Joke[] = [];
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake(() => {});
      pushUpdFavJokesSpy.and.callFake(updFavJokes => favJokes = updFavJokes);
      
      // act
      favJokesService.UpdateFavJokesAfterFavouritingJoke(joke);

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
      expect(favJokes).toContain(joke);
    })
  })

  describe('UpdateFavJokesAfterUnfavouritingJoke', () => {
    beforeEach(() => {
      joke = {
        categories:[],
        created_at:"2020-01-05 13:42:25.628594",
        icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id:"r6ygrKaoQV-wQNeAd9cCPw",
        updated_at:"2020-01-05 13:42:25.628594",
        url:"https://api.chucknorris.io/jokes/r6ygrKaoQV-wQNeAd9cCPw",
        value:"Chuck Norris wrote the songs \"Stairway to Heaven\" and \"Paradise to City\" cos he was bored."
      };

      favJokes = [
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
    })

    it('should call "GetFavJokes" method', () => {
      // arrange
      setFavJokesSpy.and.callFake(() => {});
      getFavJokesSpy.and.returnValue(favJokes);
      pushUpdFavJokesSpy.and.callFake(() => {});

      // act
      favJokesService.UpdateFavJokesAfterUnfavouritingJoke(joke);

      // assert
      expect(getFavJokesSpy).toHaveBeenCalled();
    })

    it('should call "SetFavJokes" method', () => {
      // arrange
      setFavJokesSpy.and.callFake(() => {});
      getFavJokesSpy.and.returnValue(favJokes);
      pushUpdFavJokesSpy.and.callFake(() => {});
        
      // act
      favJokesService.UpdateFavJokesAfterUnfavouritingJoke(new Joke());

      // assert
      expect(setFavJokesSpy).toHaveBeenCalled();
    })

    it('should call "SetFavJokes" method width updated fav jokes array', () => {
      // arrange
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake(updFavJokes => favJokes = updFavJokes);
      pushUpdFavJokesSpy.and.callThrough();
      
      // act
      favJokesService.UpdateFavJokesAfterUnfavouritingJoke(joke);

      // assert
      expect(setFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
      expect(favJokes).not.toContain(joke);
    })

    it('should call "PushUpdatedFavJokes" method', () => {
      // arrange
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake(() => {});
      pushUpdFavJokesSpy.and.callFake(() => {});
      
      // act
      favJokesService.UpdateFavJokesAfterUnfavouritingJoke(new Joke());

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalled();
    })

    it('should call "PushUpdatedFavJokes" method width updated fav jokes array', () => {
      // arrange
      getFavJokesSpy.and.returnValue(favJokes);
      setFavJokesSpy.and.callFake(() => {});
      pushUpdFavJokesSpy.and.callFake(updFavJokes => favJokes = updFavJokes);
      
      // act
      favJokesService.UpdateFavJokesAfterUnfavouritingJoke(joke);

      // assert
      expect(pushUpdFavJokesSpy).toHaveBeenCalledWith(favJokes);
      expect(favJokes.length).toEqual(1);
      expect(favJokes).not.toContain(joke);
    })
  })
});

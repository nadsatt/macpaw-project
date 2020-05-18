import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchJokesComponent } from './search-jokes.component';

describe('SearchJokesComponent', () => {
  let component: SearchJokesComponent;
  let fixture: ComponentFixture<SearchJokesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJokesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should execute "SubscribeToJokesSource" method', () => {
      // arrange
      spyOn(component, 'SubscribeToJokesSource').and.callFake(() => {});

      // act
      component.ngOnInit();

      // assert
      expect(component.SubscribeToJokesSource).toHaveBeenCalled();
    })
  })

  describe('template', () => {
    it('should display jokes list if jokes available', () => {
      // arrange && act
      component.jokes = [
        { categories:[],
          created_at:"2020-01-05 13:42:20.262289",
          icon_url:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id:"IUX67cIdQjG1pzEqsZPGhw",
          updated_at:"2020-01-05 13:42:20.262289",
          url:"https://api.chucknorris.io/jokes/IUX67cIdQjG1pzEqsZPGhw",
          value:"Chuck Norris knows the meaning of life. In fact, Chuck Norris IS the meaning of life."
        }
      ];
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.search-jokes__list')).toBeInstanceOf(HTMLDivElement);
    })

    it('should should not display jokes list if no jokes available', () => {
      // arrange && act
      component.jokes = [];
      fixture.detectChanges();

      // assert
      expect(fixture.nativeElement.querySelector('.search-jokes__list')).toBe(null);
    })
  })
});

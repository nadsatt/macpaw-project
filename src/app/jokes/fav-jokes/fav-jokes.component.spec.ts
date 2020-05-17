import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FavJokesComponent } from './fav-jokes.component';
import { FavJokesService } from 'src/app/_services/fav-jokes.service';

xdescribe('FavJokesComponent', () => {
  let component: FavJokesComponent;
  let fixture: ComponentFixture<FavJokesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavJokesComponent ],
      providers: [ FavJokesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should execute "SubscribeToFavJokesSource" method', () => {
      // arrange
      spyOn(component, 'SubscribeToFavJokesSource');

      // act
      component.ngOnInit();

      // assert
      expect(component.SubscribeToFavJokesSource).toHaveBeenCalled();
    })
  })
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesPageComponent } from './jokes-page.component';

describe('JokesPageComponent', () => {
  let component: JokesPageComponent;
  let fixture: ComponentFixture<JokesPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokesPageComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesPageComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

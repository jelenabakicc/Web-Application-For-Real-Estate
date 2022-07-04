import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniNekretninuComponent } from './izmeni-nekretninu.component';

describe('IzmeniNekretninuComponent', () => {
  let component: IzmeniNekretninuComponent;
  let fixture: ComponentFixture<IzmeniNekretninuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniNekretninuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniNekretninuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzabranaNekretninaComponent } from './izabrana-nekretnina.component';

describe('IzabranaNekretninaComponent', () => {
  let component: IzabranaNekretninaComponent;
  let fixture: ComponentFixture<IzabranaNekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzabranaNekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzabranaNekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

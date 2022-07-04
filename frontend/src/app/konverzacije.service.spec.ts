import { TestBed } from '@angular/core/testing';

import { KonverzacijeService } from './konverzacije.service';

describe('KonverzacijeService', () => {
  let service: KonverzacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonverzacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PonudeService } from './ponude.service';

describe('PonudeService', () => {
  let service: PonudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PonudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

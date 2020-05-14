import { TestBed } from '@angular/core/testing';

import { SesssionStorageService } from './sesssion-storage.service';

describe('SesssionStorageService', () => {
  let service: SesssionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesssionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

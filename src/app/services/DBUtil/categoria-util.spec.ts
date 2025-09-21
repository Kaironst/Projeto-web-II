import { TestBed } from '@angular/core/testing';

import { CategoriaUtil } from './categoria-util';

describe('CategoriaUtil', () => {
  let service: CategoriaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

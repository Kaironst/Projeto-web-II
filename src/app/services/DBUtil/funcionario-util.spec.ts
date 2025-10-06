import { TestBed } from '@angular/core/testing';

import { FuncionarioUtil } from './funcionario-util';

describe('FuncionarioUtil', () => {
  let service: FuncionarioUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

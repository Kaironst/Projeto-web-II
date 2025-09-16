import { TestBed } from '@angular/core/testing';

import { CadastroUtil } from './cadastro-util';

describe('CadastroUtil', () => {
  let service: CadastroUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

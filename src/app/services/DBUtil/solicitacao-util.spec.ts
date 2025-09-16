import { TestBed } from '@angular/core/testing';
import { SolicitacaoUtil } from './solicitacao-util';

describe('SolicitacaoUtil', () => {
  let service: SolicitacaoUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ControlaForm } from './controla-form';

describe('ControlaForm', () => {
  let service: ControlaForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlaForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

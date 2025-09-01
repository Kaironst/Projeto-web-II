import { TestBed } from '@angular/core/testing';

import { ErroSubmitForm } from './erro-submit-form';

describe('ErroSubmitForm', () => {
  let service: ErroSubmitForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroSubmitForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

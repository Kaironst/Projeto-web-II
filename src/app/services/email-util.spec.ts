import { TestBed } from '@angular/core/testing';

import { EmailUtil } from './email-util';

describe('EmailUtil', () => {
  let service: EmailUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

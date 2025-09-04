import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCadastros } from './lista-cadastros';

describe('ListaCadastros', () => {
  let component: ListaCadastros;
  let fixture: ComponentFixture<ListaCadastros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCadastros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCadastros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

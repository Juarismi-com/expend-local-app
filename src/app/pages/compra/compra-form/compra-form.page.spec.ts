import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraFormPage } from './compra-form.page';

describe('CompraFormPage', () => {
  let component: CompraFormPage;
  let fixture: ComponentFixture<CompraFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

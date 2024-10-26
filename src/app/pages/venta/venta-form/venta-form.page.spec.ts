import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaFormPage } from './venta-form.page';

describe('VentaFormPage', () => {
  let component: VentaFormPage;
  let fixture: ComponentFixture<VentaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

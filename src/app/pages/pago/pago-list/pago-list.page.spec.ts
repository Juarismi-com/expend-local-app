import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoListPage } from './pago-list.page';

describe('PagoListPage', () => {
  let component: PagoListPage;
  let fixture: ComponentFixture<PagoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

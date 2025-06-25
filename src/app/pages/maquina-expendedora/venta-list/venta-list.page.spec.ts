import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaListPage } from './venta-list.page';

describe('VentaListPage', () => {
  let component: VentaListPage;
  let fixture: ComponentFixture<VentaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

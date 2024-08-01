import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorDetailPage } from './proveedor-detail.page';

describe('ProveedorDetailPage', () => {
  let component: ProveedorDetailPage;
  let fixture: ComponentFixture<ProveedorDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

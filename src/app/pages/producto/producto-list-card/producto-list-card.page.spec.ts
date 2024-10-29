import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoListCardPage } from './producto-list-card.page';

describe('ProductoListCardPage', () => {
  let component: ProductoListCardPage;
  let fixture: ComponentFixture<ProductoListCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoListCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreventaShoppingCartPage } from './preventa-shopping-cart.page';

describe('PreventaShoppingCartPage', () => {
  let component: PreventaShoppingCartPage;
  let fixture: ComponentFixture<PreventaShoppingCartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventaShoppingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

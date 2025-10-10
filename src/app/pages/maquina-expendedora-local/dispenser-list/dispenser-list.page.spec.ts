import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispenserListPage } from './dispenser-list.page';

describe('DispenserListPage', () => {
  let component: DispenserListPage;
  let fixture: ComponentFixture<DispenserListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

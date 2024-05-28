import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreventaListPage } from './preventa-list.page';

describe('PreventaListPage', () => {
  let component: PreventaListPage;
  let fixture: ComponentFixture<PreventaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

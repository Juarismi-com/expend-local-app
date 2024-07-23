import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreventaDetailPage } from './preventa-detail.page';

describe('PreventaDetailPage', () => {
  let component: PreventaDetailPage;
  let fixture: ComponentFixture<PreventaDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

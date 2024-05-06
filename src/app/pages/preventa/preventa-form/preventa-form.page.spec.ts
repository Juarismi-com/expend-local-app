import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreventaFormPage } from './preventa-form.page';

describe('PreventaFormPage', () => {
  let component: PreventaFormPage;
  let fixture: ComponentFixture<PreventaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

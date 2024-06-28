import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoSimplePage } from './geo-simple.page';

describe('GeoSimplePage', () => {
  let component: GeoSimplePage;
  let fixture: ComponentFixture<GeoSimplePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSimplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

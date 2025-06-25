import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaquinaExpendedoraDetailPage } from './maquina-expendedora-detail.page';

describe('MaquinaExpendedoraDetailPage', () => {
  let component: MaquinaExpendedoraDetailPage;
  let fixture: ComponentFixture<MaquinaExpendedoraDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaExpendedoraDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

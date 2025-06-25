import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaquinaExpendedoraListPage } from './maquina-expendedora-list.page';

describe('MaquinaExpendedoraListPage', () => {
  let component: MaquinaExpendedoraListPage;
  let fixture: ComponentFixture<MaquinaExpendedoraListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaExpendedoraListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

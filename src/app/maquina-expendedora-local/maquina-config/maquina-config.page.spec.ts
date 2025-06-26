import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaquinaConfigPage } from './maquina-config.page';

describe('MaquinaConfigPage', () => {
  let component: MaquinaConfigPage;
  let fixture: ComponentFixture<MaquinaConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
